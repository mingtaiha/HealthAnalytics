import pandas as pd



state_abb = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', \
			'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', \
			'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', \
			'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', \
			'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', \
			'WI', 'WY']


gender = []
ethnicity = []


# Aggregating the Gender Precentages in the DataFrame

repeat = '_SampleData.csv'


for state in range(len(state_abb)):

	print "Doing Gender Aggregation "

	filename = state_abb[ state ] + repeat

	df = pd.read_csv(filename)
	df.pop('Unnamed: 0')

	sample_population = float(len(df.index))

	unique = df['Gender'].unique()

	tmpList = []

	for value in unique:
		print value

"""
	cholesterol.append(float(cholesterol_count) / float(sample_population))

df_out = pd.DataFrame(state_abb, index=range(len(state_abb)))
df_out['Overweight'] = pd.Series(overweight, index=range(len(overweight)))
df_out['Hypertension'] = pd.Series(hypertension, index=range(len(hypertension)))
df_out['High_Cholesterol'] = pd.Series(cholesterol, index=range(len(cholesterol)))

df_out.to_csv('Gender_Summary.csv')
