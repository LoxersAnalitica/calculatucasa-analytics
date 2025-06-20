
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { insights } from '@/utils/mockData';

export const InsightsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 border-l-4 border-l-emerald-400">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base text-white leading-tight">{insight.title}</CardTitle>
                {insight.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-400 mt-1" />}
                {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1" />}
                {insight.type === 'info' && <Target className="h-5 w-5 text-cyan-400 mt-1" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">{insight.description}</p>
              <div className="text-xs text-slate-400 mb-4 p-2 bg-slate-700/30 rounded">
                {insight.details}
              </div>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground border-slate-600 text-slate-300">
                {insight.action}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
