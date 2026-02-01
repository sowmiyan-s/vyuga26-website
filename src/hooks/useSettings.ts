import { useState, useEffect } from "react";
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

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from("site_settings" as any) // Type assertion until schema is updated
                .select("*");

            if (error) {
                console.error("Error fetching settings:", error);
                return;
            }

            if (data) {
                const newSettings = { ...settings };
                data.forEach((item: any) => {
                    if (item.key === "maintenance_mode") newSettings.maintenance_mode = item.value;
                    if (item.key === "registration_open") newSettings.registration_open = item.value;
                });
                setSettings(newSettings);
            }
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    };

    const updateSetting = async (key: keyof SystemSettings, value: boolean) => {
        try {
            // Optimistic update
            setSettings((prev) => ({ ...prev, [key]: value }));

            const { error } = await supabase
                .from("site_settings" as any)
                .upsert({ key, value });

            if (error) throw error;

            toast.success(`Setting updated: ${key.replace('_', ' ')}`);
        } catch (err) {
            toast.error("Failed to update setting");
            console.error(err);
            // Revert on error
            fetchSettings();
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return { settings, updateSetting, loading };
};
