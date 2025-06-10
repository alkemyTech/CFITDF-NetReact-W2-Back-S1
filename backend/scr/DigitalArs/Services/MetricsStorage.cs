using System.Collections.Concurrent;

namespace DigitalArs.Services
{
    public static class MetricsStorage
    {
        private static readonly ConcurrentBag<string> _metricLines = new();

        public static void AddMetric(string line)
        {
            _metricLines.Add(line);
        }

        public static string GetAllMetrics()
        {
            return string.Join("\n", _metricLines);
        }
    }
}