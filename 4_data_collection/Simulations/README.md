This folder contains the scripts necessary to extract the models and summaries from
the individual samples.

Decision_Tree_State.py is a copy of the script found in 1_code/HealthModel. Given
the size of the csv samples, it would be better to make a copy of the script to
generate the model in the same directory of the data files themselves. The alternative
would be duplicate the data files and place them in 1_code, but this will occupy
too much space.

Health_Stat_Verify.py is a script that extracts the number of people in poor health
(Overweight/Obese, Hypertension, High Cholesterol)

Stat_Aggregator.py extracts the distribution of the statistics of each attribute
of the each sample state population. The summary files can be found the directory
4_data_collection/Summaries. The README file there will give a bit more detail on
the summaries themselves.

Before deciding on the simulated samples that will be used to generate the state
level models, we generated several samples. We employed two different sampling
methods. 1) Random Sampling, which used a Pseudorandom Number Generator to generate
the sample. 2) Correlated Sampling, where certain attributes of an individual were
defined based on other attributes. The method of correlated sampling is grounded
in research which suggests that there are correlation between different attributes
(e.g. linear relationship between Systolic and Diastolic Pressures)

We generate two Randomly Generated Samples, one that is 1/100 of the population
of each state, and one that is 1/10000 of the population of each state. The
samples are labeled by their sampling method and the denominator of the fraction
generated.

We also generated 4 Correlated Sampling samples. Each correlated sampling method
employ slightly different heuristics for correlated sampling. We found that the
4th iteration was most promising. So we first generated 4 different Correlated
Samples, each 1/10000 of each state population. Then we generated a sample that
is 1/100 of the state population using the heuristic from iteration 4.


To run any of the scripts, simply place the script into any of the folders
containing the samples. While they will run on any of the samples, it is advised
you do not run Decision_Tree_State.py on the _100 samples. This is because it will
take more than 10 hours to run generate the decision trees for such large samples.
