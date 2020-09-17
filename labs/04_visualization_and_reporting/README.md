[0-Prerequisites](../00_Prerequisites/README.md) > [1-Ingestion](../01_ingestion_with_glue/README.md) > [2-Orchestration](../02_orchestration/README.md) > [3-Interactive-SQL](../03_interactive_sql_queries/README.md) > 4-Visualisation > [5-Transformations](../05_transformations/README.md) > [99-Conclusion](../99_Wrap_up_and_clean/README.md)

# Lab 4: Visualization using Amazon QuickSight
- [Introduction to Quicksight](#introduction-to-quicksight)
- [How It Works](#how-it-works)
- [Architectural Diagram](#architectural-diagram)
- [Some Quicksight Definitions](#some-quicksight-definitions)
- [Signing up for Amazon QuickSight Enterprise Edition](#signing-up-for-amazon-quicksight-enterprise-edition)
- [Associating Your S3 Buckets](#associating-your-S3-buckets)
- [Configuring Amazon QuickSight to use Amazon Athena as data source](#configuring-amazon-quicksight-to-use-amazon-athena-as-data-source)
- [Preparing your data](#preparing-your-data)
- [Visualizing your data](#visualizing-your-data)
- [Sample Dashboard Views](#sample-dashboard-views)
  - [Forecast Monthly Trend for your Quantity Column](#forecast-monthly-trend-for-your-quantity-column)
  - [Visualize Month over Month Quantity](#visualize-month-over-month-quantity)
  - [Review ML Insights](#review-ml-insights)
- [Troubleshooting FAQs](#troubleshooting-faqs)
- [License](#license)

-----
## Introduction to Quicksight

Amazon QuickSight is a fast, cloud-powered business intelligence service that makes it easy to deliver insights to everyone in your organization.

As a fully managed service, QuickSight lets you easily create and publish interactive dashboards that include ML Insights. Dashboards can then be accessed from any device, and embedded into your applications, portals, and websites.

With our Pay-per-Session pricing, QuickSight allows you to give everyone access to the data they need, while only paying for what you use.

Amazon QuickSight is built with "SPICE" – a Super-fast, Parallel, In-memory Calculation Engine. Built from the ground up for the cloud, SPICE uses a combination of columnar storage, in-memory technologies enabled through the latest hardware innovations and machine code generation to run interactive queries on large datasets and get rapid responses. 

-----
## How It Works

![image](https://d1.awsstatic.com/r2018/h/QuickSight%20Q/How%20QuickSight%20Works_without%20Q_final.026e51297c1fa18b850ce2ffc1575a9124bbad16.png)

-----
## Architectural Diagram
![architecture-overview-lab2.png](https://s3.amazonaws.com/us-east-1.data-analytics/labcontent/reinvent2017content-abd313/lab2/architecture-overview-lab2.png)

-----
## Some Quicksight Definitions


&#128161; **What is a data source and what is a dataset?**

A **data source** is an external data store and you use it to access the data in this external data store eg. Amazon S3, Amazon Athena, Salesforce etc.

A **data set** identifies the specific data in a data source that you want to use. For example, the data source might be a table if you are connecting to a database data source. It might be a file if you are connecting to an Amazon S3 data source. A data set also stores any data preparation you have performed on that data, such as renaming a field or changing its data type. Storing this preparation means that you don't have to reprepare the data each time you want to create an analysis based on it.

&#128161; **What is an Analysis, a Visual and a Dashboard?**

An **analysis** is a container for a set of related visuals and stories, for example all the ones that apply to a given business goal or key performance indicator. You can use multiple data sets in an analysis, although any given visual can only use one of those data sets.

A **visual** is a graphical representation of your data. You can create a wide variety of visuals in an analysis, using different datasets and visual types. You typically use a combination of
dimension and measure fields to produce a visual dimension and measure fields.
- Dimension Fields 
  - Text, date or geospatial fields
  - Attributes that are related to measures
  - Used to partition measures

- Measure Fields
  - Numeric values that you
  - Use for measurement, comparison, and aggregation

A **dashboard** is a read-only snapshot of an analysis that you can share with other Amazon QuickSight users for reporting purposes. A dashboard preserves the configuration of the analysis at the time you publish it, including such things as filtering, parameters, controls, and sort order. The data used for the analysis isn't captured as part of the dashboard. When you view the dashboard, it reflects the current data in the data sets used by the analysis.

-----
## Signing up for Amazon QuickSight Enterprise Edition

> Amazon QuickSight offers Standard and Enterprise editions.
> Both editions offer a full set of features for creating and sharing data visualizations.
> But Enterprise edition offers additional features such as encryption at rest and Microsoft Active Directory integration.

<p align="center"><img src="img/byod-04-registration-ed.gif" width="700"></p>

1. Open the [AWS Management Console for QuickSight](https://us-east-1.quicksight.aws.amazon.com/sn/start).
<p align="center"><img src="https://s3.amazonaws.com/us-east-1.data-analytics/labcontent/reinvent2017content-abd313/lab2/qsimage1.PNG" width="700"></p>

> &#128161; If this is the first time you are accessing QuickSight, you will see a sign-up landing page for QuickSight.

2. Click on **Sign up for QuickSight**. Your AWS account number is displayed here as well for verification purposes.

> &#9888; There are some cases where-in Chrome browser might timeout at this step. If that's the case, try this step in Firefox/Microsoft Edge/Safari.

3. On the next page, for the subscription type select the **"Enterprise Edition"** and click **Continue**. 
<p align="center"><img src="img/enterprise.png" width="900"></p>

4. On the next page, fill in the following items

   - For this workshop, we will be using Role Based Federation (SSO), make sure that the option **Role Based Federation (SSO)** is toggled.

   - Choose the **Region** where your data is located. 

   > &#128161; **Tip:** It is better to choose the AWS region you want to utilize for your default SPICE capacity. This is where your account’s free SPICE capacity is allocated after signing up. Note that you aren't able to change the default capacity region later, but you can always purchase additional SPICE capacity in different regions as needed.

   - Enter a unique **QuickSight account name.** Your account name can only contain characters (A–Z and a–z), digits (0–9), and hyphens (-).

   - Enter a valid email for **Notification email address**. The email that you register here will receive Amazon QuickSight service and usage notifications.

   - Ensure that **Enable autodiscovery of your data and users in your Amazon Redshift, Amazon RDS and AWS IAM Services** and **Amazon Athena** boxes are checked. You can change these options later in Manage Account.

   - Review your entries and **Click Finish**. 

  <p align="center"><img src="img/new-account-fields.png" width="900"></p>

5. You will be presented with a message that says **Congratulations**! **You are signed up for Amazon QuickSight!** on successful sign up. Click on **Go to Amazon QuickSight** to be directed to the QuickSight Dashboard. 

----- 
## Associating Your S3 Buckets
> Amazon QuickSight supports a variety of data sources that you can use to provide data for analyses. This <a href="https://docs.aws.amazon.com/quicksight/latest/user/supported-data-sources.html">link</a> will provide the complete list of supported data sources but in this lab we will be using the S3 bucket with your data and the Athena table you created in the previous lab.


<p align="center"><img src="img/byod-04-associatings3-ed.gif" width="700"></p>

1. In the Amazon QuickSight dashboard, navigate to User Settings by clicking on the user icon located at the top-right section of the page. A drop down menu should show up. Under English (or your preffered language) you should be able to see the region where you are in. If it's not in N.Virginia, hover over the region name and choose N.Virginia. 

> &#128161; Since we are using an Enterprise Edition, in order to manage your account settings, you must temporarily change your region for your session to **US East (N. Virginia) Region**. You can change it back to the region where your data is located when you have finished editing your account settings. These settings include changing your subscription's notification email, enabling IAM access requests, editing access to AWS resources, and unsubscribing from Amazon QuickSight.


<p align="center"><img src="img/Quicksight-region.png" width="900" ></p>

2. Once you made sure that you are in N.Virginia region, click **Manage QuickSight** under the User Settings. 

<p align="center"><img src="img/Manage-Quicksight.png" width="300"></p>

3. Once you are redirected to the Admin Dashboard, In the navigation pane on the left side, click on **Security & permissions** and then click **Add or remove** under the "QuickSight access to AWS services" section.

<p align="center"><img src="img/updated1.png" /></p> 

4. Tick the checkbox beside **Amazon S3**. This should open a pop-up page. 

  <p align="center"><img src="img/Quicksight-s3-associate.png" width="500"/></p> 

   Click on the tab that says **S3 Buckets Linked to QuickSight account**.
   On the group box, you'll be able to select the buckets that you want QuickSight to access.
   
   You have two options to approach this:
   - Choose **Select All** if you want to associate all S3 folders to QuickSight. 
   - Choose only the buckets where: 
      - You store your raw data
      - You store your Athena query results (from the previous lab)
      
      <p align="center"><img src="img/qs-workgroup-permission.png" width="500"/></p> 
> &#9888; Make sure to tick the boxes for "Write permission for Athena Workgroup" as well.  

5. When you are done doing all this, click **Update** to bring you back to the user settings back.

-----
## Configuring Amazon QuickSight to use Amazon Athena as data source


> &#9888; Make sure that you choose the region where your data resides. 
<p align="center"><img src="img/oregon.png" width="800"/></p> 

<p align="center"><img src="img/byod-04-athena-ds.gif" width="700"/></p> 


1. Click on the region icon on the top-right corner of the page, and select the region where your data resides. 

2. Click on **Datasets** in the left menu to review existing data sets.

3. Click on **New dataset** on the top-right corner of the web page and review the options. 

4. Select **Athena** as a Data source.
<p align="center"><img src="img/connectors.png" width="800"/></p> 


5. Enter the **Data source** **name** (e.g. *AthenaDataSource*).

6. Select the Athena **workgroup** you created specifically for QuickSight. Then **Validate the Connection**.
<p align="center"><img src="img/AthenaWorkGroup_DataSource.png" width="600"/></p> 

7. Click **Create data source**.

8. Choose curated database you created then choose the table you need to visualize its data.

9. Choose **Select**.

10. Choose to <b>Directly query your data</b> then click <b>Visualize</b>

***Alternative Option***

You can choose to create a dataset using S3 as your data source. For this:
* Make sure you have granted Amazon QuickSight access to any Amazon S3 buckets that you want to read files from.
* Create a manifest file to identify the text files that you want to import. [Supported Formats for Amazon S3 Manifest Files](https://docs.aws.amazon.com/quicksight/latest/user/supported-manifest-file-format.html)

-----
## Preparing your data

> &#128161; You can prepare data in any dataset to make it more suitable for analysis, for example changing a field name or adding a calculated field. For database datasets, you can also determine the data used by specifying a SQL query or joining two or more tables. You can change the field's data type in one of the available data types.


1. Go to the datasets page
  <p align="center"><img src="img/Quicksight-Dataset.png" width="200"/></p> 

2. Choose your dataset
  <p align="center"><img src="img/choose-dataset.png" width="600"/></p> 

3. Choose to Edit your Dataset
    <p align="center"><img src="img/Edit-dataset.png" width="400"/></p> 

4. Press over the arrow on the right side of the field you want to modify
  <p align="center"><img src="img/arrow-edit-dataset-type.png" width="400"/></p> 

5. Choose one of the available data types
  <p align="center"><img src="img/Field_DataTypes.png" width="400"/></p> 

6. Once you finish your edit, press the **Save and Visualize** button on top of the screen.
  <p align="center"><img src="img/save-visualize.png" width="500"/></p> 

7. You can also modify the **format of your date field(s)** into one of the supported formats.
   <p align="center"><img src="img/DateFormat.png" width="600"/></p> 


-----
## Visualizing your data

1. On the Amazon QuickSight start page, choose the **Analyses**. 
<p align="center"><img src="img/Quicksight-Analyses.png" width="200"/></p> 


2. Click on  **New analysis** on the top right side part of the page, just below the User Settings.


<p align="center"><img src="img/Quicksight-New-analysis.png" width="800"/></p> 


3. Choose your dataset
  <p align="center"><img src="img/choose-dataset.png" width="600"/></p> 

4. Choose **Create Analysis**
    <p align="center"><img src="img/Quicksight-Create-analysis.png" width="400"/></p> 

5. Choose **Add** on the application bar, and then choose Add visual. A new, blank visual is created and receives focus.
<p align="center"><img src="img/Quicksigh-Add-visual.png" width="700"/></p> 

6. Highlight the AutoGraph box and Select the fields that you will use for the visualization.
<p align="center"><img src="img/Quicksight-Fields.png" width="500"/></p> 

7. We suggest that you pick two - three columns from your data set that meet the following criteria:
    - The first column is a date column (can be year, month or day. Usually marked by **calendar icon**
in **Fields list** on the left)
    - The second column is a quantifiable number (revenue, count, distance, etc. Usually
marked by a **green hash #**)
    - The third column has categorical value, which means it has specific limited set of values (type,
category, etc. Usually marked by **ticket icon**)


<p align="center"><img src="img/Quicksight-Visual.png" width="700"/></p> 

8. **OPTIONAL** - You can **apply filters** to both regular and calculated fields, which include text, numeric, and date fields.

   a. Choose **Filter** on the tool bar.

   b. On the **Applied filters** pane, choose **Create one**, and then choose a date field to filter on.
      <p align="center"><img src="img/filter_creation.png" width="300"/></p> 

   c. Choose in which visual the filter will apply and choose the filter type from the dropdown list.
      <p align="center"><img src="img/filter_selection.png" width="300"/></p> 

   d. Choose a comparison type.
     <p align="center"><img src="img/filter_comparison_type.png" width="300"/></p> 

   e. Enter date values.
     <p align="center"><img src="img/time_range.png" width="300"/></p> 

   f. Choose Apply.

-----
## Sample Dashboard Views

Now that you have configured the data source and prepared the dataset to work with, we will
start by forecasting values in future dates based on your sample data.


### **Forecast Monthly Trend for your Quantity Column**

1. Under the **Fields list**, select your **Date** column for x-axis by clicking on the field name.

2. Change the visual type to a line chart by selecting the line chart icon highlighted in the screenshot below under **Visual types**.

At this point, the Y-axis of the visual will be populated automatically with count of records
that match each date individually. You can keep it that way and do forecasting for
**count of records**, or choose another **quantity attribute** from Fields list to populate
 Y-axis automatically and have more meaningful forecast.

Before viewing the forecast, you can choose the level of aggregation you want for your **date**
column to populate X-axis by year, month or day. 

3. Click on the **date** field name in top **Field Wells** bar to reveal a sub-menu.

4. Select **Aggregate:Month** to aggregate by month.

You can also use the slider on the X-axis to select the range of values to appear in the graph.
<p align="center"><img src="img/prepare-forecast.png" width="900"/></p> 


5. Click arrow in top right corner of the visual and select **Add forecast**.
<p align="center"><img src="img/forecast.png" width="900"/></p> 

<p align="center"><img src="img/end.png" width="900"/></p> 


> &#9888; Make sure your Y-axis is assigned to a quantity column before proceeding.


### **Visualize Month over Month Quantity**

1. Add a new visual by duplicating the previous visual. Click on visual top right arrow and select **Duplicate visual**.

2. Select **KPI** as the Visual Type (bottom left of the screen).

3. In the field wells, click arrow in **Date** column to change the aggregation level to Month or as needed.
<p align="center"><img src="img/kpi.png" width="600"/></p> 

4. Now select format visual by clicking on arrow on top right corner of the KPI graph.

5. Select **Different as percent(%)** under **comparison method** on the left.
<p align="center"><img src="img/kpi-percent.png" width="600"/></p> 


### **Review ML Insights**

1. Click the ‘Insights’ menu on the left. Notice all the suggested insights QuickSight has generated based on what has been built so far!

2. Hover over any of the insights and click the ‘+’ to add it to the dashboard.
<p align="center"><img src="img/add-insight.png" width="400"/></p> 

> &#128161; You can customize the narrative by clicking on top right arrow of the visual and
selecting **Customize narrative**.

> &#128161; The interesting outlier in the above graph is that on Jan23rd, 2016, you see the dip in the number of taxis across all types. Doing a quick google search for that date, gets us this weather article from NBC New York
<p align="center"><img src="https://s3.amazonaws.com/us-east-1.data-analytics/labcontent/reinvent2017content-abd313/lab2/qsimage22.PNG" width="600"/></p> 

> Using Amazon QuickSight, you were able to see patterns across a time-series data by building visualizations, performing ad-hoc analysis, and quickly generating insights.

-----
## Publishing Your Data
> &#128161; A dashboard preserves the configuration of the analysis at the time you publish it, including such things as filtering, parameters, controls, and sort order.
> When you share a dashboard, you specify which users have access to it. Users who are dashboard viewers can view and filter the dashboard data.

1. Open the analysis that you want to create a dashboard of. Choose **Share** on the application bar, and then choose **Publish** dashboard.

<p align="center"><img src="img/Quicksight-Publish.png" width="800"/></p> 

2. To create a new dashboard, choose **Publish new dashboard as**, and then type a dashboard name. (ie. NYTaxiSalesDashboard)

   Optionally, you to replace an existing dashboard, do one of the following:
   
   > Replacing a dashboard updates it without altering security or emailed report settings.

   - To update it with your changes, choose Replace an existing dashboard and then choose a dashboard from the list.

   - To rename it, choose Replace an existing dashboard, choose a dashboard from the list, and then choose Rename. Enter a new name to rename the existing dashboard. When you rename a dashboard, it also saves any changes you made to the analysis.



-----
## Troubleshooting FAQs

1. *Help! I Can't Connect to Amazon Athena!*

    If you can't connect to Amazon Athena, you might get an insufficient permissions error when you run a query, showing that the permissions aren't configured. To verify that you can connect Amazon QuickSight to Athena, check the following settings:

    - AWS resource permissions inside of Amazon QuickSight
    - AWS Identity and Access Management (IAM) policies
    - Amazon S3 location
    - Query results location
    - AWS KMS key policy (for encrypted datasets only)

   For information about troubleshooting other Athena issues, see <a href="https://docs.aws.amazon.com/quicksight/latest/user/troubleshoot-athena-insufficient-permissions.html">Troubleshooting Issues When Using Athena with Amazon QuickSight. </a>

2. *Help! I Can't Connect my Amazon S3 Bucket!*
  To successfully connect to Amazon S3, make sure that you configure authentication and create a valid manifest file inside the bucket you are trying to access. Also, make sure that the file described by the manifest is available.

  To verify authentication, make sure that you authorized Amazon QuickSight to access the S3 account. It’s not enough that you, the user, are authorized. Amazon QuickSight must be authorized separately.

---

## License

This library is licensed under the Apache 2.0 License. 



Now go to lab 5 : [Transformation](../05_transformations/README.md)
