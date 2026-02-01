'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { CategoriesSection } from "@/components/CategoriesSection";
import { Code2, Layers, Rocket, Palette, Box, Sparkles } from "lucide-react";

const features = [
  { icon: Code2, key: "features.cleanCode" },
  { icon: Layers, key: "features.modernStack" },
  { icon: Rocket, key: "features.performance" },
];

const expertise = [
  { icon: Code2, color: "#10B981", key: "categories.development" },
  { icon: Palette, color: "#8B5CF6", key: "categories.design" },
  { icon: Box, color: "#F59E0B", key: "categories.threeD" },
  { icon: Sparkles, color: "#EC4899", key: "categories.creative" },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 text-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 max-w-4xl z-10"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-sm font-medium text-primary backdrop-blur-sm">
                {t('hero.available')}
              </span>
            </motion.div>
            
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
              {t('hero.title')} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all bg-gradient-to-r from-primary to-purple-600">
              <Link href="/portfolio">
                {t('hero.viewPortfolio')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-12 px-8 text-lg rounded-full border-2 hover:bg-secondary/20">
              <Link href="/curriculum">
                {t('hero.viewCV')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(`${item.key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`${item.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining creativity with technical expertise to deliver exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-8 w-8" style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold">{t(item.key)}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
