using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class MongoDatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public MongoCollectionsNames CollectionsNames { get; set; } = null!;

    }
    public interface IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        public MongoCollectionsNames CollectionsNames { get; set; }
    }

    public class MongoCollectionsNames
    {
        public string Countries { get; set; } = null!;
    }
}
