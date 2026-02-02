import { Construction } from "lucide-react";
import { siteConfig } from "@/config/config";

const Maintenance = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-uiverse-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
                {/* Main Card */}
                <div className="glass-card rounded-3xl p-10 md:p-14 border border-primary/20 shadow-2xl shadow-primary/10">
                    {/* Animated Icon */}
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-uiverse-purple/30 rounded-full animate-pulse" />
                        <div className="relative bg-gradient-to-br from-primary to-uiverse-purple rounded-full p-5">
                            <Construction className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
                        We're Upgrading!
                    </h1>
                    
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                        Our team is working hard to bring you an amazing experience. 
                        We'll be back online shortly!
                    </p>

                    {/* Social Links for Updates */}
                    <div className="bg-muted/30 rounded-2xl p-6 mb-8 border border-white/5">
                        <p className="text-muted-foreground mb-4">Stay updated on our progress:</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                                href={siteConfig.whatsappGroupLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-uiverse-green/20 hover:bg-uiverse-green/30 border border-uiverse-green/40 rounded-xl text-uiverse-green font-medium transition-all hover:scale-105"
                            >
                                <span className="w-2 h-2 bg-uiverse-green rounded-full" />
                                Join WhatsApp Group
                            </a>
                            <a 
                                href={siteConfig.instagramLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-uiverse-purple/20 hover:bg-uiverse-purple/30 border border-uiverse-purple/40 rounded-xl text-uiverse-purple font-medium transition-all hover:scale-105"
                            >
                                <span className="w-2 h-2 bg-uiverse-purple rounded-full" />
                                Follow on Instagram
                            </a>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        <span className="text-sm text-yellow-200">Maintenance in progress</span>
                    </div>
                </div>

                {/* Footer message */}
                <p className="text-sm text-muted-foreground/60">
                    Thank you for your patience. We're making things better for you!
                </p>
            </div>
        </div>
    );
};

export default Maintenance;
