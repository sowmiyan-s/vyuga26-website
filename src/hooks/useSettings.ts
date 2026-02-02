import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SystemSettings {
    maintenance_mode: boolean;
    registration_open: boolean;
}

export const useSettings = () => {
    const [settings, setSettings] = useState<SystemSettings>({
        maintenance_mode: false,
        registration_open: true,
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
                };
                
                data.forEach((item) => {
                    if (item.key === "maintenance_mode") {
                        newSettings.maintenance_mode = item.value === true || item.value === "true";
                    }
                    if (item.key === "registration_open") {
                        newSettings.registration_open = item.value === true || item.value === "true";
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

    const updateSetting = async (key: keyof SystemSettings, value: boolean) => {
        try {
            // Optimistic update
            setSettings((prev) => ({ ...prev, [key]: value }));

            // Use update instead of upsert since the records already exist
            const { error } = await supabase
                .from("site_settings")
                .update({ 
                    value: value,
                    updated_at: new Date().toISOString()
                })
                .eq("key", key);

            if (error) {
                console.error("Update error:", error);
                throw error;
            }

            toast.success(`${key === 'maintenance_mode' ? 'Maintenance mode' : 'Registration status'} updated!`);
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
