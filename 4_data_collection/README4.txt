We used CDC and Census data in our project to generate our health model. Which means many of our scripts are just either exporting data from a file or pulling data from a site. 

CDC:
We used CDC data for our project, there are plenty of files available and we only chose those that we though were necessary for our project, a link to the CDC site and the SAS data files can be seen here. http://wwwn.cdc.gov/Nchs/Nhanes/Search/nhanes_continuous.aspx

Census 2010:
We used Census-2010 data to estimate state-level population. We already exported what we needed and added the json data files here, but we included a document explaining our process. The link used to browse the Census data was: http://www.census.gov/data/developers/data-sets/decennial-census-data.html

The folder Aggregated_State_Tables contain the data used by the application to display
state level statistics in forms of pie charts and histograms

The CDC and Census2010 data contains the data files to generate the Sample State Population

The National Models contain the Health Models derived from National Level Data

The Simulations folder contains scripts that generate the sample, create the state level models.
creates csv files that aggregate the different attributes of the simulated population on a
state level, and creates csv files which return the percentage of the population of 'poor'
health (Overweight/Obese, Hypertension, High Cholesterol)

The State Models contain the Health Models derived from State Sample Simulations

The Summaries folder contain useful csv files that characterizes the performance
of our model and data.

Note:
We manually downloaded these files and (in some cases) did some manual cleanup. Systematic ingestion and final filtering is done by the health model system seen in the code section.
