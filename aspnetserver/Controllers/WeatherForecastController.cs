using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Spreadsheet;

namespace open_xlsx_files.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}

[Route("api/[controller]")]
public class SpreadsheetController : Controller
{

    //To open excel file
    [AcceptVerbs("Post")]
    [HttpPost]
    [DisableCors]
    [Route("Open")]
    public IActionResult Open(IFormCollection openRequest)
    {
        OpenRequest open = new OpenRequest();
        open.File = openRequest.Files[0];
        return Content(Workbook.Open(open));
    }

    //To save as excel file
    [AcceptVerbs("Post")]
    [HttpPost]
    [DisableCors]
    [Route("Save")]
    public IActionResult Save(SaveSettings saveSettings)
    {
        return Workbook.Save(saveSettings);
    }
}