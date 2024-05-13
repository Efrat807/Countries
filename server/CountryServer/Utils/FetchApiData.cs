using log4net;
using log4net.Config;
using MongoDB.Driver;
using Repository;
using Repository.Models;
using Repository.Services;
using System.Text.Json;

namespace serverExercise.Utils
{
    public class FetchApiData
    {
        public static async Task GetAsync(HttpClient httpClient)
        {
            //BasicConfigurator.Configure();
            //XmlConfigurator.Configure(new FileInfo("Logs/web.config"));
            //XmlConfigurator.Configure(new FileInfo("Logs/LoggerConfig.xml"));
            //ILog log = LogManager.GetLogger(typeof(FetchApiData));
            //var g = "parameter";
            //log.Info($"this is my first log {g}");
            //log.Debug("This is a debug message");
            //log.Info("This is an information message");
            //log.Warn("This is a warning message");
            //Console.ForegroundColor = ConsoleColor.Red;
            //log.Error("This is an error message");
            //Console.ResetColor();
            //log.Fatal("This is a fatal message");

            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("CountryProtal");
            var countryCollection = database.GetCollection<Country>("Countries");
            if(countryCollection?.Count(_=>true) == 0)
            { 
                using HttpResponseMessage response = await httpClient.GetAsync("https://restcountries.com/v3.1/all");

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    IgnoreNullValues = true,
                    PropertyNameCaseInsensitive = true
                };
                var objectResponse = JsonSerializer.Deserialize<Country[]>(jsonResponse, options);

                countryCollection.InsertMany(objectResponse);
            }
        }
    }
}
