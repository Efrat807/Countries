using MongoDB.Driver;
using Repository.Models;
using Repository.Services;

namespace Repository
{
    public class MongoRepository
    {
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<Country> countries;
        public CountryService CountryService { get; set; }
        public MongoRepository(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            database = client.GetDatabase(databaseSettings.DatabaseName);

            countries = database.GetCollection<Country>(databaseSettings.CollectionsNames.Countries);
            CountryService = new CountryService(countries);
        }
    }
}