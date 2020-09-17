0-Prerequisites > [1-Ingestion](../01_ingestion_with_glue/README.md) > [2-Orchestration](../02_orchestration/README.md) > [3-Interactive-SQL](../03_interactive_sql_queries/README.md) > [4-Visualisation](../04_visualization_and_reporting/README.md) > [5-Transformations](../05_transformations/README.md) > [90-Data Validation Tool](../90_data_validation_tool/README.md) > [99-Conclusion](../99_Wrap_up_and_clean/README.md)

# Data Prerequisites

Before getting straight into the lab, you need to follow these preparation steps. The labs are designed in a "bring your own data" mindset, these instructions are here to help you prepare your own dataset.
 
- Choose your preferred dataset.
  - The best way is to bring your own data which can be facilitated using the [Data Validation Tool](../90_data_validation_tool/README.md), but if you just want to trial the workshop, you can use sample public datasets:
  - You can download free samples from different websites. https://www.kaggle.com/ is a good example that we used before. Most probably the dataset will include date column(s), which will be used a lot in the labs.
- Your dataset size should not exceed 2 – 3 GB max.
- Data with multiple related tables via foreign keys are supported.
- Data with nested fields like JSON structures are NOT supported.
- Structure your data in S3 so that each table would be in a separate folder, with the whole data in separate bucket. (explained in lab 1)
- Before uploading your data files to S3, make sure the files are UTF-8 encoding format. You can use terminal commands to detect your current format and use Mac TextEdit to convert (will differ on your used OS). You can use the Data Validation Tool to verify if your data files are properly encouded as UTF-8.
- Check data for date, categorical, and quantity fields
- Check that the dataset has a header
- Check Column names - no special chars and no space
- Table is un-pivoted. i.e dates are in rows not columns
 
You are now ready to go to lab 1 : [Ingestion with Glue](../01_ingestion_with_glue/README.md)

---
## License

This library is licensed under the Apache 2.0 License. 
