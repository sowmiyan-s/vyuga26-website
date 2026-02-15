import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SystemSettings {
    maintenance_mode: boolean;
    registration_open: boolean;
    outer_registration_open: boolean;
    intra_registration_open: boolean;
    dept_registration_open: boolean;
    outer_college_limit: number;
    inter_college_limit: number;
    department_limit: number;
    registration_closed_events: Record<string, boolean>;
}

const DEFAULT_OUTER_LIMIT = 300;
const DEFAULT_INTER_LIMIT = 100;
const DEFAULT_DEPT_LIMIT = 150;

export const useSettings = () => {
    const [settings, setSettings] = useState<SystemSettings>({
        maintenance_mode: false,
        registration_open: true,
        outer_registration_open: true,
        intra_registration_open: true,
        dept_registration_open: true,
        outer_college_limit: DEFAULT_OUTER_LIMIT,
        inter_college_limit: DEFAULT_INTER_LIMIT,
        department_limit: DEFAULT_DEPT_LIMIT,
        registration_closed_events: {},
    });
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("site_settings")
                .select("key, value");

            if (error) {
                console.error("Error fetching settings:", error);
                return;
            }

            if (data && data.length > 0) {
                const newSettings: SystemSettings = {
                    maintenance_mode: false,
                    registration_open: true,
                    outer_registration_open: true,
                    intra_registration_open: true,
                    dept_registration_open: true,
                    outer_college_limit: DEFAULT_OUTER_LIMIT,
                    inter_college_limit: DEFAULT_INTER_LIMIT,
                    department_limit: DEFAULT_DEPT_LIMIT,
                    registration_closed_events: {},
                };

                data.forEach((item) => {
                    if (item.key === "maintenance_mode") {
                        newSettings.maintenance_mode = item.value === true || item.value === "true";
                    }
                    if (item.key === "registration_open") {
                        newSettings.registration_open = item.value === true || item.value === "true";
                    }
                    if (item.key === "outer_registration_open") {
                        newSettings.outer_registration_open = item.value === true || item.value === "true";
                    }
                    if (item.key === "intra_registration_open") {
                        newSettings.intra_registration_open = item.value === true || item.value === "true";
                    }
                    if (item.key === "dept_registration_open") {
                        newSettings.dept_registration_open = item.value === true || item.value === "true";
                    }
                    if (item.key === "outer_college_limit") {
                        newSettings.outer_college_limit = typeof item.value === "number" ? item.value : parseInt(String(item.value)) || DEFAULT_OUTER_LIMIT;
                    }
                    if (item.key === "inter_college_limit") {
                        newSettings.inter_college_limit = typeof item.value === "number" ? item.value : parseInt(String(item.value)) || DEFAULT_INTER_LIMIT;
                    }
                    if (item.key === "department_limit") {
                        newSettings.department_limit = typeof item.value === "number" ? item.value : parseInt(String(item.value)) || DEFAULT_DEPT_LIMIT;
                    }
                    if (item.key === "registration_closed_events") {
                        newSettings.registration_closed_events = typeof item.value === 'object' ? item.value : (JSON.parse(String(item.value)) || {});
                    }
                });
                setSettings(newSettings);
            }
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSetting = async (key: keyof SystemSettings, value: boolean | number | Record<string, boolean>) => {
        try {
            // Optimistic update
            setSettings((prev) => ({ ...prev, [key]: value }));

            // Check if setting exists first
            const { data: existingData } = await supabase
                .from("site_settings")
                .select("key")
                .eq("key", key)
                .maybeSingle();

            let error;
            if (existingData) {
                // Update existing record
                const result = await supabase
                    .from("site_settings")
                    .update({
                        value: value,
                        updated_at: new Date().toISOString()
                    })
                    .eq("key", key);
                error = result.error;
            } else {
                // Insert new record
                const result = await supabase
                    .from("site_settings")
                    .insert({
                        key: key,
                        value: value,
                        updated_at: new Date().toISOString()
                    });
                error = result.error;
            }

            if (error) {
                console.error("Update error:", error);
                throw error;
            }

            const labels: Record<string, string> = {
                maintenance_mode: "Maintenance mode",
                registration_open: "Registration status",
                outer_registration_open: "Outer college registration",
                intra_registration_open: "Intra college registration",
                dept_registration_open: "Department registration",
                outer_college_limit: "Outer college limit",
                inter_college_limit: "Inter college limit",
                department_limit: "Department limit",
                registration_closed_events: "Event registration status"
            };
            toast.success(`${labels[key] || key} updated!`);
        } catch (err) {
            console.error("Failed to update setting:", err);
            toast.error("Failed to update setting");
            // Revert on error
            fetchSettings();
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return { settings, updateSetting, loading, refetch: fetchSettings };
};
