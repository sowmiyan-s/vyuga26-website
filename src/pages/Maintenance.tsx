import { Construction } from "lucide-react";

const Maintenance = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center space-y-6 max-w-lg mx-auto p-8 glass-card rounded-2xl animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <Construction className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h1 className="text-4xl font-display font-bold text-gradient">
                    Under Maintenance
                </h1>
                <p className="text-muted-foreground text-lg">
                    We are currently upgrading our systems to serve you better.
                    Please check back later.
                </p>
                <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                        Expected downtime: ~1 hour
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
