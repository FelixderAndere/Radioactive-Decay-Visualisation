



The Normal distribution already shows noticeable deviations, particularly in the low-probability tails, because the expected number of decays is too small for the Gaussian approximation.

Both the Binomial and the Poisson distribution closely match the measured histogram.





## Why does the Binomial distribution fit slightly better?

Radioactive decay is often described as a **Poisson process**.

Strictly speaking, this is only an approximation.

The simulator starts with a fixed number of nuclei

```
N
```

and each nucleus independently decays with probability

```
p = 1 - exp(-λt).
```

Consequently, the exact number of decayed nuclei is

```
X ~ Binomial(N,p).
```

The Poisson distribution arises only as the limiting case

- large number of nuclei,
- very small decay probability,
- constant expected number of decays

```
μ = Np.
```

Mathematically,

```
Binomial(N,p)
        ↓
N → ∞
p → 0
Np = constant
        ↓
Poisson(μ)
```

Therefore, the exact distribution for a finite radioactive sample is **Binomial**, while the Poisson distribution is an excellent approximation whenever

```
N >> 1
```

and

```
p << 1.
```

In the benchmark shown above,

- Half-life = 5 years
- Simulation time = 0.01 years

giving

```
p ≈ 0.001385.
```

The expected variance is therefore

```
Binomial:
Var = Np(1-p)

Poisson:
Var = Np
```

Since

```
1-p = 0.998615,
```

the Binomial variance is only about **0.14 %** smaller than the Poisson variance.

This explains why both curves almost overlap.

The simulator nevertheless agrees slightly better with the Binomial distribution because every particle is simulated by an independent Bernoulli trial, which is exactly the mathematical definition of a Binomial random variable.

The Poisson distribution therefore represents the limiting approximation of the simulated process rather than the exact distribution itself.


# Conclusions

The statistical validation confirms that the simulator reproduces the expected physical behaviour of radioactive decay.

- The deterministic simulation follows the exponential decay law.
- The stochastic simulation reproduces the expected statistical fluctuations.
- Numerical convergence is achieved for decreasing simulation step sizes.
- Finite particle populations produce the expected discrete probability distributions.
- The simulated decay counts follow the exact Binomial distribution.
- Under realistic physical conditions the Binomial distribution becomes almost indistinguishable from its Poisson approximation.
- The observed agreement with both theory and probability distributions provides strong validation of the simulation algorithm.


# License

This project is released under the MIT License.