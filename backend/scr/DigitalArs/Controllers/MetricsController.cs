using Microsoft.AspNetCore.Mvc;
using DigitalArs.Services;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace DigitalArs.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class MetricsController : ControllerBase
    {
        [HttpPost("frontend")]
        public async Task<IActionResult> ReceiveFrontendMetrics([FromBody] JsonElement data)
        {
            string name = data.GetProperty("name").GetString() ?? "unknown";
            double value = data.TryGetProperty("value", out var valProp) ? valProp.GetDouble() : 0;

            var metricLine = $"frontend_metric_total{{name=\"{name}\"}} {value}";
            MetricsStorage.AddMetric(metricLine);

            return Ok();
        }

        [HttpGet("/metrics-frontend")]
        public IActionResult GetMetrics()
        {
            var all = MetricsStorage.GetAllMetrics();
            return Content(all, "text/plain");
        }
    }
}