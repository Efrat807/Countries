using MongoDB.Driver;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Services
{
    public class CountryService
    {
        private readonly IMongoCollection<Country> _countries;

        public CountryService(IMongoCollection<Country> countries)
        {
            _countries = countries;
        }

        public List<Country> GetCountries()
        {
            return _countries.Find(_ => true).ToList();
        }

        public Country GetCountryById(string id)
        {
            return _countries.Find(c => c.Id == id).First();
        }

        public void CreateCountry(Country country)
        {
            _countries.InsertOne(country);
        }
        public void UpdateCountry(Country country, string countryId)
        {
            _countries.ReplaceOne(country => country.Id == countryId, country);
        }
    }
}
