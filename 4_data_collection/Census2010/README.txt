Census 2010 Data Collection Information


To create a CSV file with all the Census data seen below, you need to run:
python flatten_data.py

This script will create a file called "census.csv" in the folder "outputs".
This file will have all of the cesus data used for our scripts to generate testing samples.

The script creates a csv file with the following columns:
state, state population, ethnicity, gender, age group, group population


== General Information ==
API url: http://api.census.gov/data/2010/sf1?for=state:*&get=<VARIABLES>&key=<KEY>
Key: 2b08a105d5fe3f30c6827a837d996886db194f72
Variables: http://api.census.gov/data/2010/sf1/variables.html
Explanation Document: http://www.census.gov/prod/cen2010/doc/sf1.pdf
Examples: http://api.census.gov/data/2010/sf1/examples.html
Developer information: http://www.census.gov/data/developers/data-sets/decennial-census-data.html
Data sets available: http://api.census.gov/data.html

== Data Variables Used ==
Total Population: total_population_per_state.json
P0010001

SEX BY AGE (WHITE ALONE) [49]: white_alone.json
P012A001,P012A002,P012A003,P012A004,P012A005,P012A006,P012A007,P012A008,P012A009,P012A010,P012A011,P012A012,P012A013,P012A014,P012A015,P012A016,P012A017,P012A018,P012A019,P012A020,P012A021,P012A022,P012A023,P012A024,P012A025,P012A026,P012A027,P012A028,P012A029,P012A030,P012A031,P012A032,P012A033,P012A034,P012A035,P012A036,P012A037,P012A038,P012A039,P012A040,P012A041,P012A042,P012A043,P012A044,P012A045,P012A046,P012A047,P012A048,P012A049

SEX BY AGE (BLACK OR AFRICAN AMERICAN ALONE)[49]: black_or_african_american_alone.json
P012B001,P012B002,P012B003,P012B004,P012B005,P012B006,P012B007,P012B008,P012B009,P012B010,P012B011,P012B012,P012B013,P012B014,P012B015,P012B016,P012B017,P012B018,P012B019,P012B020,P012B021,P012B022,P012B023,P012B024,P012B025,P012B026,P012B027,P012B028,P012B029,P012B030,P012B031,P012B032,P012B033,P012B034,P012B035,P012B036,P012B037,P012B038,P012B039,P012B040,P012B041,P012B042,P012B043,P012B044,P012B045,P012B046,P012B047,P012B048,P012B049

SEX BY AGE (AMERICAN INDIAN AND ALASKA NATIVE ALONE) [49]: american_indian_and_alaska_native_alone.json
P012C001,P012C002,P012C003,P012C004,P012C005,P012C006,P012C007,P012C008,P012C009,P012C010,P012C011,P012C012,P012C013,P012C014,P012C015,P012C016,P012C017,P012C018,P012C019,P012C020,P012C021,P012C022,P012C023,P012C024,P012C025,P012C026,P012C027,P012C028,P012C029,P012C030,P012C031,P012C032,P012C033,P012C034,P012C035,P012C036,P012C037,P012C038,P012C039,P012C040,P012C041,P012C042,P012C043,P012C044,P012C045,P012C046,P012C047,P012C048,P012C049

SEX BY AGE (ASIAN ALONE) [49]: asian_alone.json
P012D001,P012D002,P012D003,P012D004,P012D005,P012D006,P012D007,P012D008,P012D009,P012D010,P012D011,P012D012,P012D013,P012D014,P012D015,P012D016,P012D017,P012D018,P012D019,P012D020,P012D021,P012D022,P012D023,P012D024,P012D025,P012D026,P012D027,P012D028,P012D029,P012D030,P012D031,P012D032,P012D033,P012D034,P012D035,P012D036,P012D037,P012D038,P012D039,P012D040,P012D041,P012D042,P012D043,P012D044,P012D045,P012D046,P012D047,P012D048,P012D049

SEX BY AGE (NATIVE HAWAIIAN AND OTHER PACIFIC ISLANDER ALONE) [49]: native_hawaiian_and_other_pacific_islander_alone.json
P012E001,P012E002,P012E003,P012E004,P012E005,P012E006,P012E007,P012E008,P012E009,P012E010,P012E011,P012E012,P012E013,P012E014,P012E015,P012E016,P012E017,P012E018,P012E019,P012E020,P012E021,P012E022,P012E023,P012E024,P012E025,P012E026,P012E027,P012E028,P012E029,P012E030,P012E031,P012E032,P012E033,P012E034,P012E035,P012E036,P012E037,P012E038,P012E039,P012E040,P012E041,P012E042,P012E043,P012E044,P012E045,P012E046,P012E047,P012E048,P012E049

SEX BY AGE (SOME OTHER RACE ALONE) [49]: some_other_race_alone.json
P012F001,P012F002,P012F003,P012F004,P012F005,P012F006,P012F007,P012F008,P012F009,P012F010,P012F011,P012F012,P012F013,P012F014,P012F015,P012F016,P012F017,P012F018,P012F019,P012F020,P012F021,P012F022,P012F023,P012F024,P012F025,P012F026,P012F027,P012F028,P012F029,P012F030,P012F031,P012F032,P012F033,P012F034,P012F035,P012F036,P012F037,P012F038,P012F039,P012F040,P012F041,P012F042,P012F043,P012F044,P012F045,P012F046,P012F047,P012F048,P012F049

SEX BY AGE (TWO OR MORE RACES) [49]: two_or_more_races.json
P012G001,P012G002,P012G003,P012G004,P012G005,P012G006,P012G007,P012G008,P012G009,P012G010,P012G011,P012G012,P012G013,P012G014,P012G015,P012G016,P012G017,P012G018,P012G019,P012G020,P012G021,P012G022,P012G023,P012G024,P012G025,P012G026,P012G027,P012G028,P012G029,P012G030,P012G031,P012G032,P012G033,P012G034,P012G035,P012G036,P012G037,P012G038,P012G039,P012G040,P012G041,P012G042,P012G043,P012G044,P012G045,P012G046,P012G047,P012G048,P012G049

SEX BY AGE (HISPANIC OR LATINO) [49]: hispanic_or_latino.json
P012H001,P012H002,P012H003,P012H004,P012H005,P012H006,P012H007,P012H008,P012H009,P012H010,P012H011,P012H012,P012H013,P012H014,P012H015,P012H016,P012H017,P012H018,P012H019,P012H020,P012H021,P012H022,P012H023,P012H024,P012H025,P012H026,P012H027,P012H028,P012H029,P012H030,P012H031,P012H032,P012H033,P012H034,P012H035,P012H036,P012H037,P012H038,P012H039,P012H040,P012H041,P012H042,P012H043,P012H044,P012H045,P012H046,P012H047,P012H048,P012H049

SEX BY AGE (WHITE ALONE, NOT HISPANIC OR LATINO) [49]: white_alone_not_hispanic_or_latino.json
P012I001,P012I002,P012I003,P012I004,P012I005,P012I006,P012I007,P012I008,P012I009,P012I010,P012I011,P012I012,P012I013,P012I014,P012I015,P012I016,P012I017,P012I018,P012I019,P012I020,P012I021,P012I022,P012I023,P012I024,P012I025,P012I026,P012I027,P012I028,P012I029,P012I030,P012I031,P012I032,P012I033,P012I034,P012I035,P012I036,P012I037,P012I038,P012I039,P012I040,P012I041,P012I042,P012I043,P012I044,P012I045,P012I046,P012I047,P012I048,P012I049


== Legend ==
Race Information:
XX12AXXX WHITE ALONE
XX12BXXX BLACK OR AFRICAN AMERICAN ALONE
XX12CXXX AMERICAN INDIAN AND ALASKA NATIVE ALONE
XX12DXXX ASIAN ALONE
XX12EXXX NATIVE HAWAIIAN AND OTHER PACIFIC ISLANDER ALONE
XX12FXXX SOME OTHER RACE ALONE
XX12GXXX TWO OR MORE RACES
XX12HXXX HISPANIC OR LATINO
XX12IXXX WHITE ALONE, NOT HISPANIC OR LATINO


Sex/Age Information:
XXXXX001 Total for the race group
XXXXX002 Total Male
XXXXX003 Male under 5 
XXXXX004 Male 5 to 9 years
XXXXX005 Male 10 to 14 years
XXXXX006 Male 15 to 17 years
XXXXX007 Male 18 to 19 years
XXXXX008 Male 20 years
XXXXX009 Male 21 years
XXXXX010 Male 22 to 24 years
XXXXX011 Male 25 to 29 years
XXXXX012 Male 30 to 34 years
XXXXX013 Male 35 to 39 years
XXXXX014 Male 40 to 44 years
XXXXX015 Male 45 to 49 years
XXXXX016 Male 50 to 54 years
XXXXX017 Male 55 to 59 years
XXXXX018 Male 60 to 61 years
XXXXX019 Male 62 to 64 years
XXXXX020 Male 65 to 66 years
XXXXX021 Male 67 to 69 years
XXXXX022 Male 70 to 74 years
XXXXX023 Male 75 to 79 years
XXXXX024 Male 80 to 84 years
XXXXX025 Male 85 years and over
XXXXX026 Total Female
XXXXX027 Female under 5 
XXXXX028 Female 5 to 9 years
XXXXX029 Female 10 to 14 years
XXXXX030 Female 15 to 17 years
XXXXX031 Female 18 to 19 years
XXXXX032 Female 20 years
XXXXX033 Female 21 years
XXXXX034 Female 22 to 24 years
XXXXX035 Female 25 to 29 years
XXXXX036 Female 30 to 34 years
XXXXX037 Female 35 to 39 years
XXXXX038 Female 40 to 44 years
XXXXX039 Female 45 to 49 years
XXXXX040 Female 50 to 54 years
XXXXX041 Female 55 to 59 years
XXXXX042 Female 60 to 61 years
XXXXX043 Female 62 to 64 years
XXXXX044 Female 65 to 66 years
XXXXX045 Female 67 to 69 years
XXXXX046 Female 70 to 74 years
XXXXX047 Female 75 to 79 years
XXXXX048 Female 80 to 84 years
XXXXX049 Female 85 years and over


State Information:
01 Alabama
02 Alaska
04 Arizona
05 Arkansas
06 California
08 Colorado
09 Connecticut
10 Delaware
11 District of Columbia 
12 Florida
13 Georgia
15 Hawaii
16 Idaho
17 Illinois 
18 Indiana 
19 Iowa
20 Kansas 
21 Kentucky 
22 Louisiana 
23 Maine
24 Maryland
25 Massachusetts 
26 Michigan
27 Minnesota
28 Mississippi
29 Missouri
30 Montana
31 Nebraska
32 Nevada
33 New Hampshire
34 New Jersey
35 New Mexico
36 New York
37 North Carolina
38 North Dakota
39 Ohio
40 Oklahoma
41 Oregon
42 Pennsylvania
44 Rhode Island
45 South Carolina 
46 South Dakota 
47 Tennessee
48 Texas
49 Utah
50 Vermont
51 Virginia
53 Washington 
54 West Virginia 
55 Wisconsin 
56 Wyoming
72 Puerto Rico
