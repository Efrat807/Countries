using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Models;
using log4net;
using log4net.Config;
using serverExercise.Utils;
using System.Diagnostics.Metrics;

namespace serverExercise.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : Controller
    {
        public readonly MongoRepository repository;
        public ILog log;
        public CountryController(MongoRepository mongoRepository)
        {
            repository = mongoRepository;
            XmlConfigurator.Configure(new FileInfo("Logs/LoggerConfig.xml"));
            log = LogManager.GetLogger(typeof(CountryController));
        }
        [HttpGet]
        public IActionResult GetAllCountries()
        {
            try
            {
                List<Country> result = repository.CountryService.GetCountries();
                log.Info($"succeeded to get all countries");
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //[HttpGet("{id}")]
        //public IActionResult GetCountryById(string countryId)
        //{
        //    try
        //    {
        //        Country country = repository.CountryService.GetCountryById(countryId);
        //        log.Info($"success to get country: {countryId}");
        //        return Ok(country);
        //    }
        //    catch (Exception e)
        //    {
        //        log.Error($"{e.Message}. an error occured when try to get country: {countryId}");
        //        return BadRequest($"{e} \nan error occured when try to get country: {countryId}");
        //    }
        //}

        [HttpPost]
        public ActionResult<Country> Create(Country country)
        {
            try
            {
                repository.CountryService.CreateCountry(country);
                log.Info($"succeeded to create a country: {country.Name}");
                return country;
            }
            catch (Exception e)
            {
                log.Error($"an error occured when try to create a country: {country.Name}");
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public ActionResult<Country> Update(Country country)
        {
            try
            {
                repository.CountryService.UpdateCountry(country, country?.Id);
                log.Info($"succeeded to update a country: {country.Name}");
                return country;
            }
            catch (Exception e)
            {
                log.Error($"an error occured when try to update a country: {country.Name}\n{e}");
                return BadRequest(e.Message);
            }
        }
    }
}