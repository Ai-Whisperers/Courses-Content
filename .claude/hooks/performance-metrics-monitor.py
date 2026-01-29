#!/usr/bin/env python3
"""
Performance Metrics Monitor for FPUNA Context Engineering
Tracks compaction efficiency (70-85% reduction) and budget utilization across educational tracks.
"""

import os
import sys
import json
import time
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import statistics


class PerformanceMetricsMonitor:
    """Monitor performance metrics for FPUNA context engineering system"""

    def __init__(self, metrics_base: Path):
        self.metrics_base = metrics_base
        self.metrics_dir = metrics_base / "performance_metrics"
        self.metrics_dir.mkdir(exist_ok=True)

        # Track compaction sessions
        self.compaction_sessions = self.metrics_dir / "compaction_sessions.json"
        self.budget_utilization = self.metrics_dir / "budget_utilization.json"

        # Initialize metrics files if they don't exist
        self._initialize_metrics_files()

    def _initialize_metrics_files(self):
        """Initialize performance tracking files"""

        # Compaction efficiency tracking
        if not self.compaction_sessions.exists():
            self._write_json(
                self.compaction_sessions,
                {
                    "sessions": [],
                    "summary": {
                        "total_compactions": 0,
                        "average_reduction": 0.0,
                        "target_achievement_rate": 0.0,  # Percentage meeting 70-85% target
                        "educational_preservation_rate": 0.0,
                    },
                },
            )

        # Budget utilization tracking
        if not self.budget_utilization.exists():
            self._write_json(
                self.budget_utilization,
                {
                    "utilization_by_track": {},
                    "budget_allocations": {
                        "educational-reasoning": {
                            "allocated": 20000,
                            "utilizations": [],
                        },
                        "session-extended": {"allocated": 25000, "utilizations": []},
                        "mercosur-analysis": {"allocated": 25000, "utilizations": []},
                    },
                    "summary": {
                        "overall_efficiency": 0.0,
                        "peak_utilization_rate": 0.0,
                        "educational_budget_effectiveness": 0.0,
                    },
                },
            )

    def record_compaction_session(self, session_data: Dict[str, Any]):
        """Record a compaction session and calculate efficiency metrics"""

        compaction_data = self._read_json(self.compaction_sessions)
        sessions = compaction_data["sessions"]

        # Record new session
        session_record = {
            "session_id": session_data.get(
                "session_id", f"session_{len(sessions) + 1}"
            ),
            "timestamp": datetime.now().isoformat(),
            "pre_compaction_tokens": session_data.get("pre_compaction_tokens", 0),
            "post_compaction_tokens": session_data.get("post_compaction_tokens", 0),
            "educational_value_preserved": session_data.get(
                "educational_value_preserved", True
            ),
            "track": session_data.get("track", "unknown"),
            "compaction_method": session_data.get(
                "compaction_method", "deepwiki_98_threshold"
            ),
        }

        # Calculate efficiency metrics
        pre_tokens = session_record["pre_compaction_tokens"]
        post_tokens = session_record["post_compaction_tokens"]

        if pre_tokens > 0:
            reduction_percentage = ((pre_tokens - post_tokens) / pre_tokens) * 100
            session_record["reduction_percentage"] = round(reduction_percentage, 2)

            # Check if meeting target range (70-85%)
            target_range = 70 <= reduction_percentage <= 85
            session_record["target_achievement"] = target_range

        sessions.append(session_record)

        # Update summary statistics
        self._update_compaction_summary(sessions)

        # Save updated data
        compaction_data["sessions"] = sessions
        self._write_json(self.compaction_sessions, compaction_data)

        return session_record

    def record_budget_utilization(self, budget_data: Dict[str, Any]):
        """Record thinking budget utilization across tracks"""

        utilization_data = self._read_json(self.budget_utilization)

        track = budget_data.get("track", "unknown")
        budget_type = budget_data.get("budget_type", "educational-reasoning")

        utilization_record = {
            "timestamp": datetime.now().isoformat(),
            "allocated_tokens": budget_data.get("allocated_tokens", 25000),
            "utilized_tokens": budget_data.get("utilized_tokens", 0),
            "efficiency_rating": budget_data.get("efficiency_rating", 0.0),
            "educational_outcome": budget_data.get("educational_outcome", "unknown"),
            "mercosur_context_factor": budget_data.get(
                "mercosur_context_factor", False
            ),
        }

        # Add to track-specific utilization
        if track not in utilization_data["utilization_by_track"]:
            utilization_data["utilization_by_track"][track] = []

        utilization_data["utilization_by_track"][track].append(utilization_record)

        # Add to budget type tracking
        if budget_type in utilization_data["budget_allocations"]:
            utilization_data["budget_allocations"][budget_type]["utilizations"].append(
                utilization_record
            )

        # Update summary statistics
        self._update_budget_summary(utilization_data)

        # Save updated data
        self._write_json(self.budget_utilization, utilization_data)

        return utilization_record

    def get_performance_report(self) -> Dict[str, Any]:
        """Generate comprehensive performance report"""

        compaction_data = self._read_json(self.compaction_sessions)
        budget_data = self._read_json(self.budget_utilization)

        report = {
            "timestamp": datetime.now().isoformat(),
            "compaction_performance": compaction_data["summary"],
            "budget_performance": budget_data["summary"],
            "system_health": self._calculate_system_health(
                compaction_data, budget_data
            ),
            "recommendations": self._generate_recommendations(
                compaction_data["summary"], budget_data["summary"]
            ),
        }

        return report

    def _update_compaction_summary(self, sessions: List[Dict[str, Any]]):
        """Update compaction efficiency summary statistics"""

        if not sessions:
            return

        compaction_data = self._read_json(self.compaction_sessions)
        summary = compaction_data["summary"]

        # Calculate metrics
        total_sessions = len(sessions)
        reduction_percentages = [
            s.get("reduction_percentage", 0)
            for s in sessions
            if "reduction_percentage" in s
        ]
        target_achievements = [
            s.get("target_achievement", False)
            for s in sessions
            if "target_achievement" in s
        ]

        summary["total_compactions"] = total_sessions

        if reduction_percentages:
            summary["average_reduction"] = round(
                statistics.mean(reduction_percentages), 2
            )

        if target_achievements:
            target_rate = sum(target_achievements) / len(target_achievements)
            summary["target_achievement_rate"] = round(target_rate * 100, 1)

        # Educational preservation rate (assume high if not explicitly failed)
        educational_sessions = [
            s for s in sessions if s.get("educational_value_preserved", True)
        ]
        summary["educational_preservation_rate"] = round(
            (len(educational_sessions) / total_sessions) * 100, 1
        )

        # Update the file
        compaction_data["summary"] = summary
        self._write_json(self.compaction_sessions, compaction_data)

    def _update_budget_summary(self, budget_data: Dict[str, Any]):
        """Update budget utilization summary statistics"""

        summary = budget_data["summary"]
        budget_allocations = budget_data["budget_allocations"]

        all_utilizations = []
        peak_utilizations = []

        for budget_type, data in budget_allocations.items():
            utilizations = data["utilizations"]
            if utilizations:
                utilizations_list = [
                    u.get("utilized_tokens", 0) / u.get("allocated_tokens", 25000)
                    for u in utilizations
                ]
                all_utilizations.extend(utilizations_list)
                if utilizations_list:
                    peak_utilizations.append(max(utilizations_list))

        if all_utilizations:
            summary["overall_efficiency"] = round(
                statistics.mean(all_utilizations) * 100, 1
            )

        if peak_utilizations:
            summary["peak_utilization_rate"] = round(max(peak_utilizations) * 100, 1)

        # Educational effectiveness (simplified calculation)
        educational_utilizations = [
            u
            for budget_type, data in budget_allocations.items()
            for u in data["utilizations"]
            if u.get("educational_outcome") != "unknown"
        ]

        if educational_utilizations:
            effectiveness_list = [
                u.get("efficiency_rating", 0) for u in educational_utilizations
            ]
            summary["educational_budget_effectiveness"] = round(
                statistics.mean(effectiveness_list) * 100, 1
            )

    def _calculate_system_health(
        self, compaction_data: Dict[str, Any], budget_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Calculate overall system health score"""

        compaction_summary = compaction_data["summary"]
        budget_summary = budget_data["summary"]

        health_score = 0
        health_factors = []

        # Compaction target range achievement (40% weight)
        target_rate = compaction_summary.get("target_achievement_rate", 0)
        if target_rate >= 80:  # 80% of sessions meeting 70-85% target
            health_score += 40
            health_factors.append("Excellent compaction efficiency")
        elif target_rate >= 60:
            health_score += 25
            health_factors.append("Good compaction efficiency")
        else:
            health_factors.append("Compaction efficiency needs improvement")
            health_score += 10

        # Budget utilization (30% weight)
        budget_efficiency = budget_summary.get("overall_efficiency", 0)
        if budget_efficiency >= 80:
            health_score += 30
            health_factors.append("High budget utilization")
        elif budget_efficiency >= 60:
            health_score += 20
            health_factors.append("Adequate budget utilization")
        else:
            health_factors.append("Budget utilization optimization needed")
            health_score += 10

        # Educational preservation (20% weight)
        preservation_rate = compaction_summary.get("educational_preservation_rate", 0)
        if preservation_rate >= 95:
            health_score += 20
            health_factors.append("Excellent educational integrity")
        elif preservation_rate >= 85:
            health_score += 15
            health_factors.append("Good educational integrity")
        else:
            health_factors.append("Educational preservation needs attention")
            health_score += 5

        # MERCOSUR integration bonus (10% weight)
        mercosur_factor = budget_summary.get("educational_budget_effectiveness", 0)
        if mercosur_factor >= 85:
            health_score += 10
            health_factors.append("Strong MERCOSUR integration")
        elif mercosur_factor >= 70:
            health_score += 7
            health_factors.append("Good MERCOSUR integration")
        else:
            health_factors.append("MERCOSUR integration developing")
            health_score += 3

        return {
            "overall_health_score": health_score,
            "health_status": "Excellent"
            if health_score >= 90
            else "Good"
            if health_score >= 70
            else "Needs Attention",
            "health_factors": health_factors,
        }

    def _generate_recommendations(
        self, compaction_summary: Dict[str, Any], budget_summary: Dict[str, Any]
    ) -> List[str]:
        """Generate optimization recommendations based on metrics"""

        recommendations = []

        # Compaction recommendations
        target_rate = compaction_summary.get("target_achievement_rate", 0)
        if target_rate < 70:
            recommendations.append(
                "Optimize compaction algorithms to consistently achieve 70-85% token reduction"
            )
        elif target_rate > 95:
            recommendations.append(
                "Fine-tune compaction to avoid over-reduction while maintaining efficiency"
            )

        # Budget recommendations
        budget_efficiency = budget_summary.get("overall_efficiency", 0)
        if budget_efficiency < 60:
            recommendations.append(
                "Review budget allocation logic for better MERCOSUR and educational context detection"
            )
        elif budget_efficiency > 90:
            recommendations.append(
                "Consider calibrating upward pressure on thinking budgets for complex analysis"
            )

        # Educational preservation
        preservation_rate = compaction_summary.get("educational_preservation_rate", 0)
        if preservation_rate < 90:
            recommendations.append(
                "Enhance educational context extraction to maintain 95%+ preservation"
            )

        if not recommendations:
            recommendations.append(
                "All metrics within optimal ranges - continue monitoring for trends"
            )

        return recommendations

    def _read_json(self, file_path: Path) -> Dict[str, Any]:
        """Read JSON file safely"""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    def _write_json(self, file_path: Path, data: Dict[str, Any]):
        """Write JSON file safely"""
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)


# Demonstration and monitoring setup
def setup_performance_monitoring():
    """Setup comprehensive performance monitoring for FPUNA tracks"""

    print(
        "📊 Setting up FPUNA Context Engineering Performance Monitoring...",
        file=sys.stderr,
    )

    home = Path.home()
    monitor = PerformanceMetricsMonitor(home / ".claude")

    # Simulate compaction session data (based on expected performance)
    sample_compactions = [
        {
            "session_id": "marketing-session-001",
            "pre_compaction_tokens": 180000,
            "post_compaction_tokens": 35000,
            "educational_value_preserved": True,
            "track": "marketing-negocios-turismo",
            "compaction_method": "deepwiki_98_threshold",
        },
        {
            "session_id": "marketing-session-002",
            "pre_compaction_tokens": 165000,
            "post_compaction_tokens": 28000,
            "educational_value_preserved": True,
            "track": "marketing-negocios-turismo",
            "compaction_method": "deepwiki_98_threshold",
        },
        {
            "session_id": "research-session-001",
            "pre_compaction_tokens": 210000,
            "post_compaction_tokens": 32000,
            "educational_value_preserved": True,
            "track": "investigacion-academica",
            "compaction_method": "intelligent_educational_preservation",
        },
    ]

    # Record sample compaction sessions
    for compaction in sample_compactions:
        result = monitor.record_compaction_session(compaction)
        print(
            f"✅ Recorded compaction session: {result['reduction_percentage']}% reduction",
            file=sys.stderr,
        )

    # Simulate budget utilization data
    sample_budgets = [
        {
            "track": "marketing-negocios-turismo",
            "budget_type": "session-extended",
            "allocated_tokens": 25000,
            "utilized_tokens": 22000,
            "efficiency_rating": 0.88,
            "educational_outcome": "mercosur_business_analysis",
            "mercosur_context_factor": True,
        },
        {
            "track": "desarrollo-software",
            "budget_type": "educational-reasoning",
            "allocated_tokens": 20000,
            "utilized_tokens": 17500,
            "efficiency_rating": 0.92,
            "educational_outcome": "computer_science_education",
            "mercosur_context_factor": False,
        },
    ]

    # Record sample budget utilizations
    for budget in sample_budgets:
        result = monitor.record_budget_utilization(budget)
        print(
            f"✅ Recorded budget utilization: {result['efficiency_rating'] * 100:.1f}% efficiency",
            file=sys.stderr,
        )

    # Generate and display performance report
    report = monitor.get_performance_report()

    print("\n📈 FPUNA CONTEXT ENGINEERING PERFORMANCE REPORT", file=sys.stderr)
    print("=" * 50, file=sys.stderr)

    print(
        f"Compaction Efficiency: {report['compaction_performance']['target_achievement_rate']:.1f}% achieving 70-85% target",
        file=sys.stderr,
    )
    print(
        f"Average Reduction: {report['compaction_performance']['average_reduction']:.1f}%",
        file=sys.stderr,
    )
    print(
        f"Educational Preservation: {report['compaction_performance']['educational_preservation_rate']:.1f}%",
        file=sys.stderr,
    )

    print(
        f"\nBudget Utilization: {report['budget_performance']['overall_efficiency']:.1f}% efficiency",
        file=sys.stderr,
    )
    print(
        f"Peak Utilization: {report['budget_performance']['peak_utilization_rate']:.1f}%",
        file=sys.stderr,
    )
    print(
        f"Educational Effectiveness: {report['budget_performance']['educational_budget_effectiveness']:.1f}%",
        file=sys.stderr,
    )

    print(
        f"\nSystem Health: {report['system_health']['health_status']} ({report['system_health']['overall_health_score']}/100)",
        file=sys.stderr,
    )

    print("\n🎯 Recommendations:", file=sys.stderr)
    for rec in report["recommendations"]:
        print(f"  • {rec}", file=sys.stderr)

    return True


def main():
    """Execute performance metrics monitoring setup."""
    try:
        success = setup_performance_monitoring()

        if success:
            print(
                "\n✅ FPUNA Context Engineering Performance Monitoring Active",
                file=sys.stderr,
            )
            print(
                "📊 Tracking compaction efficiency (70-85% target) and budget utilization across tracks",
                file=sys.stderr,
            )
            return 0
        else:
            print("\n❌ Performance monitoring setup failed", file=sys.stderr)
            return 1

    except Exception as e:
        print(f"[PerformanceMonitor] Critical failure: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
