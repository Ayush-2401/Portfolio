"use client";

import React, { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { skills } from '@/lib/content/skills';
import { motion } from 'framer-motion';

export default function Skills() {
  const radarData = useMemo(() => {
    return skills.flatMap(category => category.skills).map(skill => ({
      subject: skill.name,
      value: skill.level,
      fullMark: 100,
    }));
  }, []);

  return (
    <section className="px-6 md:px-16 max-w-[1280px] mx-auto py-16 relative">
      <div className="font-mono text-[13px] text-text-muted mb-8">~/skill-radar</div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto h-[400px] md:h-[500px] bg-term-bg rounded-lg border border-border-subtle relative overflow-hidden shadow-[0_0_20px_rgba(57,255,136,0.05)]">
        <div className="absolute top-0 left-0 w-full h-8 bg-term-header border-b border-border-subtle flex items-center px-4 space-x-2 z-10">
          <div className="w-3 h-3 rounded-full bg-error/80"></div>
          <div className="w-3 h-3 rounded-full bg-warning/80"></div>
          <div className="w-3 h-3 rounded-full bg-success/80"></div>
          <div className="ml-4 font-mono text-[10px] text-text-muted">radar.sh</div>
        </div>

        <div className="w-full h-full pt-10 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
              <PolarGrid gridType="polygon" stroke="var(--border-subtle)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontFamily: 'var(--font-mono)' }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                tickCount={5}
                stroke="var(--border-subtle)"
              />
              <Radar
                name="Proficiency"
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.25}
                isAnimationActive={true}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)', 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)'
                }}
                itemStyle={{ color: 'var(--accent)' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
