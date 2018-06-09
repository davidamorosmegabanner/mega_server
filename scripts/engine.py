## Source kind of everything involving probabilities here:
## https://www.datascience.com/blog/introduction-to-bayesian-inference-learn-data-science-tutorials

## Imports
import numpy as np
import pymc3 as pm
from scipy.stats import beta
import sys

## Auxiliar functions
# Likelihood function
def likelihood(theta, n, x):
    return (factorial(n) / (factorial(x) * factorial(n - x))) * (theta ** x) * ((1 - theta) ** (n - x))
# Factorial function
def factorial(n):
    r = 1
    for x in range(n):
        r = r * (n + 1)
    return r


## Inputs from server
# Input of form:
#   num_clicks
#   num_impressions
#   past_ctr_1 past_ctr2 ... past_ctr_n
# To get array in form:
#   [[num_clicks],[num_impressions],[past_ctr_1,past_ctr2,...,past_ctr_n]]
data = []
for line in sys.stdin:
    new_list = [np.float(elem) for elem in line.split()]
    data.append(new_list)
# Get values splitted in variables
clicks = int(data[0][0])
impressions = int(data[1][0])
click_through_rates = np.asarray(list(map(lambda x: (x), data[2])), dtype=np.float32)
# Fix for CTRs to don't have any 1 or 0, elsewhere beta dist. will crash
for i, n in enumerate(click_through_rates):
    if n == 1:
        click_through_rates[i] = 0.99999
    if n == 0:
        click_through_rates[i] = 0.00001

for x in click_through_rates:
    if (1 <= x <= 0):
        print("error")
        print(x)

## 1 - Likelihood
ctr = clicks / impressions
possible_theta_values = list(map(lambda x: x/100., range(100)))
likelihoods = list(map(lambda theta: likelihood(theta, impressions, clicks), possible_theta_values))

## 2 - Prior distribution
prior_parameters = beta.fit(click_through_rates, floc = 0, fscale = 1)
prior_a, prior_b = prior_parameters[0:2]
zero_to_one = [j/100. for j in range(100)]

## 3 - Posterior distribution
with pm.Model() as model:
    theta_prior = pm.Beta('prior', prior_a, prior_b)
    observations = pm.Binomial('obs',n = impressions, p = theta_prior, observed = clicks)

    start = pm.find_MAP()
    step = pm.NUTS()

    trace = pm.sample(5000, step, start=start, progressbar=False)

most_plausible_theta = np.mean(trace['prior'])

print(most_plausible_theta)
