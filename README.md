[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![GitHub Repo stars](https://img.shields.io/github/stars/FelixderAndere/Radioactive-Decay-Visualisation)
![GitHub issues](https://img.shields.io/github/issues/FelixderAndere/Radioactive-Decay-Visualisation)
![GitHub Pages](https://img.shields.io/badge/demo-online-brightgreen.svg)
![GitHub release](https://img.shields.io/github/v/release/FelixderAndere/Radioactive-Decay-Visualisation)
[![Live Demo](https://img.shields.io/badge/live-demo-blue?logo=github)](https://felixderandere.github.io/Radioactive-Decay-Visualisation/)

# Radioactive Decay Visualisation

An interactive simulation and visualisation of radioactive decay chains.




# Demo

## Live website

https://felixderandere.github.io/Radioactive-Decay-Visualisation/

## Screenshot

![App Screenshot](https://github.com/FelixderAndere/Radioactive-Decay-Visualisation/blob/main/test/images/Demo.png)

*Fig. 1: Two screenshots of the website showing the deterministic ("Theory") mode and the stochastic ("Random") simulation.*


# Content

- Interactive web application
- Simulation engine
- Configurable decay chains
- Statistical validation scripts
- Python CLI (outdated)


# Features

- Simulate radioactive decay
- Change simulation parameters
   - Adjust atom count,  simulation step size and simulation duration
- Edit or select the decay chain you want.
   - Configure half-lives and branching ratios
- Visualise isotope populations over time
   - See the results with an atomic lattice and a chart.
   - Switch between deterministic and stochastic simulation
- Export data for statistical analysis




# Physical / Mathematical Background

Radioactive decay is fundamentally a random process. Every unstable nucleus has a constant probability of decaying per unit time, independent of its age.

For a nucleus with half-life `T₁/₂`, the decay
constant is

```text
λ = ln(2) / T₁/₂
p = 1 - exp(-λΔt)
```

where `p` is the probability that one particle decays during the time step
`Δt`. A shorter half-life means a larger `λ` and therefore a faster
decay. After one half-life, the expected amount of the original substance is
reduced to 50%.


## Theory Mode

Theory mode computes the expected deterministic value of the decay process.

Every step uses the decay probability above, but replaces the random
outcome with its mean value. The exponential decay law is:

```text
N(t) = N₀ * exp(-λ · t)
```

For a decay chain, each substance is updated from its current amount by
subtracting the expected decayed fraction and distributing that fraction to
its decay products (daughter isotopes) according to the configured branching ratios.

```text
decayed = N(t) * (1 - exp(-λ · Δt))
N_next = N(t) - decayed
product_next = product_current + (decayed · branching_ratio)
```



The resulting curves are smooth and deterministic and represent the average behaviour of infinitely many repeated experiments.


## Random Mode

Random mode simulates individual particles with decay probabilities.

The simulator converts the current fraction `N` into an absolute amount `n`, 
performs for each particle independently one Bernoulli trial with probability `p`
and converts the decayed amount `X` back into the displayed fraction.
In practice this behaves like a binomial process:

```text
n = round(N · particleCount)
X ~ Binomial(n,p)
```

Because only a finite number of particles is simulated, every run produces slightly different curves
and can deviate more strongly for smaller populations or larger time steps.




# Discussion

The following validation tests investigate both the numerical implementation and the statistical properties of the simulation. The data is produced with
the `/test/test_steps.js` and `/test/test_distribution.js` script and analysed with EXCEL. 


## Numerical convergence

The first benchmark investigates the influence of the simulation step size.

The preset `Demo` was simulated over `30 years` with identical initial conditions (`800 atoms`) while varying only the simulation time step.

![Step size comparison](https://github.com/FelixderAndere/Radioactive-Decay-Visualisation/blob/main/test/images/Demo_30j.png)

*Fig. 2: Comparison of the deterministic and stochastic simulations.*

![Excel analysis](https://github.com/FelixderAndere/Radioactive-Decay-Visualisation/blob/main/test/images/Analysis_step.png)

*Fig. 3: Excel analysis comparing different simulation step sizes.*


The results demonstrate the expected numerical behaviour:

- smaller time steps reduce discretisation errors,
- the average of many stochastic simulations converges towards the deterministic solution,
- remaining deviations originate from statistical fluctuations of the finite particle population. 

The simulator therefore converges towards the analytical solution as the time step approaches zero while preserving the stochastic behaviour expected for radioactive decay.


## Distribution of complete decay chains

The next benchmark analyses the statistical distribution after 30 simulated years using the complete decay chain.

![Distribution analysis](https://github.com/FelixderAndere/Radioactive-Decay-Visualisation/blob/main/test/images/Analysis_dist.png)

*Fig. 4: Distribution of all isotopes after repeated stochastic simulations.*


Several observations can be made:

- isotopes with only a few atoms show discrete quantisation because atom numbers are integers,
- the visible lines in the point clusters are therefore a physical consequence of finite particle numbers rather than a numerical artefact.
- these distributions are nearly symmetric and visually indistinguishable from a normal distribution.


## Statistical analysis of a single decay process

To investigate the underlying probability distribution in more detail, the complete decay chain is reduced to a single radioactive isotope.

The parameters were intentionally selected to maximise the asymmetry of the distribution:

- short simulation time,
- small decay probability,
- many repeated simulations.

Under these conditions only a small fraction of atoms decays, making the differences between probability distributions clearly visible.

The simulated histogram is compared with

- the Binomial distribution,
- the Poisson distribution,
- the Normal distribution.

![Distribution comparison](https://github.com/FelixderAndere/Radioactive-Decay-Visualisation/blob/main/test/images/Analysis_distributions.png)

*Fig. 5: Comparison of the simulated decay histogram with theoretical probability distributions.*

The Normal distribution already shows noticeable deviations. Both the Binomial and the Poisson distribution closely match the measured histogram. Only the RSME and MAE show a slighly better fit for the Binomial distribution.

Radioactive decay should approximately follow a Poisson distribution for infinite Atoms and small propabitilies. But the simulator starts with a fixed finite number of nuclei `N` and each nucleus independently decays with probability `p`. Consequently, the exact number of decayed nuclei is:

```
p = 1 - exp(-λt)
X ~ Binomial(N,p)
```

The Poisson distribution arises only as the limiting case

- large number of nuclei,
- very small decay probability,
- constant expected number of decays

Mathematically,

```
μ = Np

Binomial(N,p)
        ↓
N → ∞
p → 0
Np = constant
        ↓
Poisson(μ)
```

Therefore, the distribution for a finite radioactive sample is Binomial, while the Poisson distribution is an excellent approximation whenever `N >> 1` and `p << 1`. 


## Conclusions

The statistical validation confirms that the simulator reproduces the expected physical behaviour of radioactive decay.

- The deterministic simulation follows the exponential decay law.
- The stochastic simulation reproduces the expected statistical fluctuations.
- Numerical convergence is achieved for decreasing simulation step sizes.
- Finite particle populations produce the expected discrete probability distributions.
- The simulated decay counts follow the exact Binomial distribution and is almost indistinguishable from its Poisson approximation
- The observed agreement with both theory and probability distributions provides strong validation of the simulation algorithm.


# Use of AI

This project was realised with assistance from AI for research and code / text writing.


# License

This project is released under the MIT License.
