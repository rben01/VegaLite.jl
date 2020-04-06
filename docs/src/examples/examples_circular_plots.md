# Circular Plots

## Pie Chart

```@example
using VegaLite, DataFrames

df = DataFrame(category=1:6, value=[4,6,10,3,7,8])

df |> @vlplot(:arc, theta=:value, color="category:n", view={stroke=nothing})
```

## Donut Chart

```@example
using VegaLite, DataFrames

df = DataFrame(category=1:6, value=[4,6,10,3,7,8])

df |> @vlplot(mark={:arc, innerRadius=50}, theta=:value, color="category:n", view={stroke=nothing})
```

## Pie Chart with Labels

```@example
using VegaLite, DataFrames

df = DataFrame(category=1:6, value=[4,6,10,3,7,8])

df |>
@vlplot(
    theta={:value, stack=true}, 
    color={"category:n", legend=nothing},
    view={stroke=nothing}) +
@vlplot(mark={:arc, outerRadius=80}) +
@vlplot(mark={:text, radius=90}, text="category:n")
```

## Radial Plot

```@example
using VegaLite

@vlplot(
    data={values=[12, 23, 47, 6, 52, 19]},
    theta={:data, stack=true},
    radius={:data, scale={type=:sqrt, zero=true, range=[20,100]}},
    color={"data:n", legend=nothing},
    view={stroke=nothing}
) +
@vlplot(mark={:arc, innerRadius=20, stroke="#fff"}) +
@vlplot(mark={:text, radiusOffset=10}, text=:data)
```

## Pyramid Pie Chart

```@example
using VegaLite, DataFrames

df = DataFrame(
    category=["Sky", "Shady side of a pyramid", "Sunny side of a pyramid"],
    value=[75, 10, 15],
    order=[3,1,2]
)

df |> @vlplot(
    mark={:arc, outerRadius=80},
    theta={:value, scale={range=[2.35619449, 8.639379797]}, stack=true},
    color={
        :category,
        scale={
            domain=["Sky", "Shady side of a pyramid", "Sunny side of a pyramid"],
            range=["#416D9D", "#674028", "#DEAC58"]
        },
        legend={orient=:none, title=nothing, columns=1, legendX=200, legendY=80}
    },
    order=:order,
    view={stroke=nothing}
)
```
