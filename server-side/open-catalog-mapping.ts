export class OpenCatalogMapping {
    public static mappingOpenCatalog = {
        "Settings": {
            "number_of_shards": 1,
            "analysis": {
                "normalizer": {
                    "my_normalizer": {
                        "type": "custom",
                        "filter": ["lowercase"]
                    }
                }
            }
        },
        "Mapping": {
            "dynamic_templates": [
                {
                    "strings": {
                        "match_mapping_type": "string",
                        "mapping": { "type": "keyword", "normalizer": "my_normalizer" }
                    }
                },
                {
                    "decimals": {
                        "match_mapping_type": "double",
                        "mapping": { "type": "double" }
                    }
                }
            ],
            "properties": {
                "ElasticSearchType": { "type": "keyword" },
                "ElasticSearchSubType": { "type": "keyword" },
                "UUID": { "type": "keyword" },
                "CategoryUUID": { "type": "keyword" },
                "NonIndexedText": {
                    "type": "nested",
                    "enabled": false,
                    "properties": {
                        "APIName": { "type": "keyword" },
                        "Value": { "type": "text" }
                    }
                },
                "NonIndexedNumber": {
                    "type": "nested",
                    "enabled": false,
                    "properties": {
                        "APIName": { "type": "keyword" },
                        "Value": { "type": "float" }
                    }
                },
                "NonIndexedBool": {
                    "type": "nested",
                    "enabled": false,
                    "properties": {
                        "APIName": { "type": "keyword" },
                        "Value": { "type": "boolean" }
                    }
                },
                "NonIndexedDate": {
                    "type": "nested",
                    "enabled": false,
                    "properties": {
                        "APIName": { "type": "keyword" },
                        "Value": { "type": "date" }
                    }
                }
            }
        }
    };
}