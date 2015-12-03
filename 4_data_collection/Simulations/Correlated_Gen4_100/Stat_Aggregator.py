import pandas as pd
from math import floor
from math import ceil



state_abb = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', \
			'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', \
			'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', \
			'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', \
			'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', \
			'WI', 'WY']


gender = []
ethni = []



# Aggregating the Gender Precentages in the DataFrame

repeat = '_SampleData.csv'


print "Doing Aggregation for  Gender"

for state in range(len(state_abb)):

	filename = state_abb[ state ] + repeat

	df = pd.read_csv(filename)
	df.pop('Unnamed: 0')

	total_value = float(len(df.index))
	unique = ['M', 'F']

	tmpList = []

	for value in unique:
		count_value = float(df[df['Gender'] == value]['Gender'].count())
		tmpList.append( count_value / total_value )

	gender.append(tmpList)

df_out = pd.DataFrame(gender, index=state_abb)
df_out.columns = unique
df_out.to_csv('Gender_Summary.csv')



print "Doing Aggregation for  Ethnicity"

for state in range(len(state_abb)):

	filename = state_abb[ state ] + repeat

	df = pd.read_csv(filename)
	df.pop('Unnamed: 0')

	total_value = float(len(df.index))
	unique = ['WhiteNonHisp', 'Hisp', 'Black', 'Asian', 'NavAm', 'PacIs', 'Mixed', 'Other']

	tmpList = []

	for value in unique:
		count_value = float(df[df['Ethnicity'] == value]['Ethnicity'].count())
		tmpList.append( count_value / total_value )

	ethni.append(tmpList)

df_out = pd.DataFrame(ethni, index=state_abb)
df_out.columns = unique
df_out.to_csv('Ethnicity_Summary.csv')


predictor = ['Age_years', 'Height', 'Waist', 'Weight', 'BMI', 'WtHR', 'HR', \
			'Avg_Sys', 'Avg_Dia', 'Tri', 'LDL', 'HDL']

for key in range(len(predictor)):

	continuous = []

	print "Doing Aggregation for ", predictor[ key ]

	curr_prd = predictor[ key ]

	for state in range(len(state_abb)):

		filename = state_abb[ state ] + repeat

		df = pd.read_csv(filename)
		df.pop('Unnamed: 0')

		total_value = float(len(df.index))
		
		min_value = floor(df[ curr_prd ].min())
		max_value = ceil(df[ curr_prd ].max())
		average = df[ curr_prd ].mean()
		std = df[ curr_prd ].std()

		tmpList = []

		tmpList.append(average)
		tmpList.append(std)
		tmpList.append(min_value)
		tmpList.append(max_value)

		slope = (max_value - min_value) / 20
		bins = [(min_value + (slope * float(i))) for i in range(21)]

		for j in range(20):
			count_value = float(df[(df[ curr_prd ] >= bins[ j ]) \
					& (df[ curr_prd ] < bins[ j + 1 ])][ curr_prd ].count())

			tmpList.append( count_value / total_value )
			

		continuous.append(tmpList)


	df_out = pd.DataFrame(continuous, index=state_abb)
	columns = ['Avg', 'Std', 'Min', 'Max', 'Bin1', 'Bin2', 'Bin3', 'Bin4', 'Bin5', \
				'Bin6', 'Bin7', 'Bin8', 'Bin9', 'Bin10', 'Bin11', 'Bin12', 'Bin13', \
				'Bin14', 'Bin15', 'Bin16', 'Bin17', 'Bin18', 'Bin19', 'Bin20']
	df_out.columns = columns

	if predictor[ key ] == 'Age_years':
		df_out.to_csv('Age_Summary.csv')

	elif predictor[ key ] == 'Avg_Sys':
		df_out.to_csv('Sys_Summary.csv')

	elif predictor[ key ] == 'Avg_Dia':
		df_out.to_csv('Dia_Summary.csv')

	else:
		df_out.to_csv(predictor[ key ] + '_Summary.csv')
