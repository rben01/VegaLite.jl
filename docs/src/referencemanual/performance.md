# Performance Tips

[VegaLite.jl](https://github.com/queryverse/VegaLite.jl) does many things to make plotting easy and fun; for some tasks, a little help from an advanced user goes a long way. Here
are a few tips for improving plotting speeds.


## Example 1: DataFrame with many columns, only a couple are used

In order to speed up plotting, only pass necessary columns to the ``@vplot`` macro.

```julia
using VegaLite, DataFrames

df = DataFrame(rand(100, 1000))

@time df |> @vlplot(:point, x=:x1, y=:x2)
# 58.488104 seconds (8.79 M allocations: 519.253 MiB, 0.36% gc time)

@time select(df, [:x1, :x2]) |> @vlplot(:point, x=:x1, y=:x2)
# 0.382024 seconds (733.50 k allocations: 45.077 MiB, 4.41% gc time, 61.54% compilation time)
```
