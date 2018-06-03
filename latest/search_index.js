var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": "VegaLite.jl enables the generation of Vega-Lite plots from Julia.Vega-Lite is a visualization grammar describing mappings from data to graphical properties (e.g. marks, axes, scales). For rendering it uses pre-defined design rules that keep the visualization specification succinct while still leaving user control.Vega-Lite supports:data transformation, sorting, filtering and grouping.\naggregation, binning, and simple statistical analysis (e.g. mean, std, var, count).\nplots can be faceted, layered and stacked vertically or horizontally."
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "To install the package run Pkg.add(\"VegaLite\")."
},

{
    "location": "index.html#Principles-1",
    "page": "Home",
    "title": "Principles",
    "category": "section",
    "text": "The package is essentially a thin layer translating Julia statements to the Vega-Lite visualization specification format.One can take any Vega-Lite specification and easily translate it into corresponding julia code. In addition, the package provides various ways to specify figures in a much more concise way. Here is an example of a scatter plot with a legend:using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(\n  :point,\n  x=:Horsepower,\n  y=:Miles_per_Gallon,\n  color=:Origin,\n  width=400,\n  height=400\n)"
},

{
    "location": "gettingstarted/quick.html#",
    "page": "Quick Tour",
    "title": "Quick Tour",
    "category": "page",
    "text": ""
},

{
    "location": "gettingstarted/quick.html#Quick-tour-1",
    "page": "Quick Tour",
    "title": "Quick tour",
    "category": "section",
    "text": ""
},

{
    "location": "gettingstarted/quick.html#Simple-scatter-plot-1",
    "page": "Quick Tour",
    "title": "Simple scatter plot",
    "category": "section",
    "text": "Use functions linked by the |> operator to build your visuialization incrementally. VegaLite.jl can use DataFrames or DataTables as sources for data. For a scatter plot, specify that the mark should a point by markpoint(), then how the data in the DataFrame mpg (fields :Cty, :Hwy and :Manufacturer) should be connected to the encoding channels (x, y and color respectively). Finally, global configuration options are provided in a config function (type ? config`to see all the options).using RDatasets\n\nmpg = dataset(\"ggplot2\", \"mpg\") # load the \'mpg\' dataframe\n\nmpg |> # start with the data source (here a DataFrame)\n  markpoint() |>\n  encoding(xquantitative(field=:Cty, axis=nothing),\n           yquantitative(field=:Hwy, vlscale(zero=false)),\n           colornominal(field=:Manufacturer)) |>    # bind color to :Manufacturer, nominal scale\n  config(vlcell(width=350, height=400))(Image: plot1)An alternative, more julian syntax, without the piping operator is also valid. The preceding statement can just as well be written :plot(data(mpg),\n     markpoint(),\n     encoding(xquantitative(field=:Cty, axis=nothing),\n              yquantitative(field=:Hwy, vlscale(zero=false)),\n              colornominal(field=:Manufacturer)),\n     config(vlcell(width=350, height=400)))"
},

{
    "location": "gettingstarted/quick.html#Stacking-multiple-plots-with-hconcat()-or-vconcat()-1",
    "page": "Quick Tour",
    "title": "Stacking multiple plots with hconcat() or vconcat()",
    "category": "section",
    "text": "Several independant plots can be concatenated vertically or horizontally :using RDatasets\n\nmpg = dataset(\"ggplot2\", \"mpg\") # load the \'mpg\' dataframe\n\nr1 = markline() |>\n     encoding(xquantitative(field=:Cty, axis=nothing),\n              yquantitative(field=:Hwy, vlscale(zero=false)),\n              colornominal(field=:Manufacturer)) ;\n\nr2 = markrect() |>\n      encoding(xquantitative(field=:Displ, vlbin(maxbins=5)),\n               yquantitative(field=:Hwy, vlbin(maxbins=5)),\n               colornominal(field=:Manufacturer)) ;\n\nmpg |>\n  vconcat(r1) |>\n  vconcat(r2) |>\n  config(vlcell(width=400))(Image: plot2)"
},

{
    "location": "gettingstarted/quick.html#Using-layer()-to-surimpose-several-plots-1",
    "page": "Quick Tour",
    "title": "Using layer() to surimpose several plots",
    "category": "section",
    "text": "When several marks need to shown on the same visualization, use the layer() function :using DataFrames\n\ndf  = DataFrame(x=[0:5;], y=rand(6))\n\nencx = xquantitative(field=:x)\nency = yquantitative(field=:y)\n\ndf |>\n  plot(width=500) |>\n  layer(markline(interpolate=\"linear\"),\n        encoding(encx, ency, vlcolor(value=\"green\"))) |>\n  layer(markline(interpolate=\"basis\"),\n        encoding(encx, ency, vlcolor(value=\"red\"))) |>\n  layer(markpoint(), encoding(encx, ency, vlcolor(value=\"black\")))(Image: plot4)"
},

{
    "location": "gettingstarted/quick.html#Using-repeat()-to-facet-a-plot-by-data-fields-1",
    "page": "Quick Tour",
    "title": "Using repeat() to facet a plot by data fields",
    "category": "section",
    "text": "To create a facet plot with encoding channels cycled through a list of data fields use the repeat() function :using Distributions, DataTables\n\nxs = rand(Normal(), 100, 3)\ndt = DataTable(a = xs[:,1] + xs[:,2] .^ 2,\n               b = xs[:,3] .* xs[:,2],\n               c = xs[:,3] .+ xs[:,2])\n\ndt |>\n  repeat(column = [:a, :b, :c], row = [:a, :b, :c]) |>\n  config(vlcell(width=100, height=100)) |>\n  spec(markpoint(),\n       encoding(xquantitative(vlfield(repeat=:column)),\n                yquantitative(vlfield(repeat=:row))))(Image: plot3)"
},

{
    "location": "examples/examples_simplecharts.html#",
    "page": "Simple Charts",
    "title": "Simple Charts",
    "category": "page",
    "text": ""
},

{
    "location": "examples/examples_simplecharts.html#Simple-Bar-Chart-1",
    "page": "Simple Charts",
    "title": "Simple Bar Chart",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\ndata = DataFrame(\n    a=[\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\"],\n    b=[28,55,43,91,81,53,19,87,52]\n)\n\ndata |> @vlplot(:bar, x=:a, y=:b)"
},

{
    "location": "examples/examples_simplecharts.html#Simple-Heatmap-1",
    "page": "Simple Charts",
    "title": "Simple Heatmap",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\nx = [j for i in -5:4, j in -5:4]\ny = [i for i in -5:4, j in -5:4]\nz = x.^2 .+ y.^2\ndata = DataFrame(x=vec(x\'),y=vec(y\'),z=vec(z\'))\n\ndata |> @vlplot(:rect, x=\"x:o\", y=\"y:o\", color=:z)"
},

{
    "location": "examples/examples_simplecharts.html#Simple-Histogram-1",
    "page": "Simple Charts",
    "title": "Simple Histogram",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"movies\") |>\n@vlplot(:bar, x={:IMDB_Rating, bin=true}, y=\"count()\")"
},

{
    "location": "examples/examples_simplecharts.html#Simple-Line-Chart-1",
    "page": "Simple Charts",
    "title": "Simple Line Chart",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\nx = 0:100\ndata = DataFrame(x=x,sin=sin.(x./5))\n\ndata |> @vlplot(:line, x=:x, y={:sin, title=\"sin(x)\"})"
},

{
    "location": "examples/examples_simplecharts.html#Simple-Scatter-Plot-1",
    "page": "Simple Charts",
    "title": "Simple Scatter Plot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"iris\") |>\n@vlplot(:point, x=:petalWidth, y=:petalLength, color=:species)TODO Add interactivity"
},

{
    "location": "examples/examples_simplecharts.html#Simple-Stacked-Area-Chart-1",
    "page": "Simple Charts",
    "title": "Simple Stacked Area Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"unemployment-across-industries\") |>\n@vlplot(:area, x=\"date:t\", y=:count, color=:series)"
},

{
    "location": "examples/examples_simplecharts.html#Strip-Plot-1",
    "page": "Simple Charts",
    "title": "Strip Plot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:tick, x=:Horsepower, y=\"Cylinders:o\")"
},

{
    "location": "examples/examples_barchartshistograms.html#",
    "page": "Bar Charts & Histograms",
    "title": "Bar Charts & Histograms",
    "category": "page",
    "text": ""
},

{
    "location": "examples/examples_barchartshistograms.html#Simple-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Simple Bar Chart",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\ndata = DataFrame(\n    a=[\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\"],\n    b=[28,55,43,91,81,53,19,87,52]\n)\n\ndata |> @vlplot(:bar, x=\"a:o\", y=:b)"
},

{
    "location": "examples/examples_barchartshistograms.html#Histogram-1",
    "page": "Bar Charts & Histograms",
    "title": "Histogram",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"movies\") |>\n@vlplot(:bar, x={:IMDB_Rating, bin=true}, y=\"count()\")"
},

{
    "location": "examples/examples_barchartshistograms.html#Aggregate-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Aggregate Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"population\") |>\n@vlplot(\n    :bar,\n    transform=[{filter=\"datum.year == 2000\"}],\n    y={\"age:o\", scale={rangeStep=17}},\n    x={\"sum(people)\", axis={title=\"population\"}}\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Grouped-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Grouped Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"population\") |>\n@vlplot(\n    :bar,\n    transform=[\n        {filter=\"datum.year == 2000\"},\n        {calculate=\"datum.sex == 2 ? \'Female\' : \'Male\'\", as=\"gender\"}\n    ],\n    enc={\n        column=\"age:o\",\n        y={\"sum(people)\", axis={title=\"population\", grid=false}},\n        x={\"gender:n\", scale={rangeStep=12}, axis={title=\"\"}},\n        color={\"gender:n\", scale={range=[\"#EA98D2\", \"#659CCA\"]}},\n    },\n    config={\n        view={stroke=:transparent},\n        axis={domainWidth=1}\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Stacked-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Stacked Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"seattle-weather\") |>\n@vlplot(\n    :bar,\n    x={\"month(date):o\", axis={title=\"Month of the year\"}},\n    y=\"count()\",\n    color={\n        :weather,\n        scale={\n            domain=[\"sun\",\"fog\",\"drizzle\",\"rain\",\"snow\"],\n            range=[\"#e7ba52\",\"#c7c7c7\",\"#aec7e8\",\"#1f77b4\",\"#9467bd\"]\n        },\n        legend={\n            title=\"Weather type\"\n        }\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Horizontal-Stacked-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Horizontal Stacked Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"barley\") |>\n@vlplot(:bar, x=\"sum(yield)\", y=:variety, color=:site)"
},

{
    "location": "examples/examples_barchartshistograms.html#Normalized-Stacked-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Normalized Stacked Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"population\") |>\n@vlplot(\n    :bar,\n    transform=[\n        {filter=\"datum.year == 2000\"},\n        {calculate=\"datum.sex==2 ? \'Female\' : \'Male\'\",as=\"gender\"}\n    ],\n    enc={\n        y={\n            \"sum(people)\",\n            axis={title=\"population\"},\n            stack=:normalize\n        },\n        x={\n            \"age:o\",\n            scale={rangeStep=17}\n        },\n        color={\n            \"gender:n\",\n            scale={range=[\"#EA98D2\", \"#659CCA\"]}\n        }\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Gantt-Chart-(Ranged-Bar-Marks)-1",
    "page": "Bar Charts & Histograms",
    "title": "Gantt Chart (Ranged Bar Marks)",
    "category": "section",
    "text": "using VegaLite\n\n@vlplot(\n    :bar,\n    data={\n        values=[\n            {task=\"A\",start=1,stop=3},\n            {task=\"B\",start=3,stop=8},\n            {task=\"C\",start=8,stop=10}\n        ]\n    },\n    enc={\n        y=\"task:o\",\n        x=\"start:q\",\n        x2=\"stop:q\"\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#A-bar-chart-encoding-color-names-in-the-data-1",
    "page": "Bar Charts & Histograms",
    "title": "A bar chart encoding color names in the data",
    "category": "section",
    "text": "using VegaLite\n\n@vlplot(\n    :bar,\n    data={\n        values=[\n            {color=\"red\",b=28},\n            {color=\"green\",b=55},\n            {color=\"blue\",b=43}\n        ]\n    },\n    x=\"color:n\",\n    y=\"b:q\",\n    color={\"color:n\",scale=nothing}\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Layered-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Layered Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"population\") |>\n@vlplot(\n    :bar,\n    transform=[\n        {filter=\"datum.year==2000\"},\n        {calculate=\"datum.sex==2 ? \'Female\' : \'Male\'\",as=\"gender\"}\n    ],\n    enc={\n        x={\"age:o\", scale={rangeStep=17}},\n        y={\"sum(people)\", axis={title=\"population\"}, stack=nothing},\n        color={\"gender:n\", scale={range=[\"#e377c2\", \"#1f77b4\"]}},\n        opacity={value=0.7}\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Diverging-Stacked-Bar-Chart-1",
    "page": "Bar Charts & Histograms",
    "title": "Diverging Stacked Bar Chart",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\ndata = DataFrame(\n    question=[\"Question $(div(i,5)+1)\" for i in 0:39],\n    typ=repeat([\"Strongly disagree\", \"Disagree\", \"Neither agree nor disagree\",\n        \"Agree\", \"Strongly agree\"],outer=8),\n    value=[24, 294, 594, 1927, 376, 2, 2, 0, 7, 11, 2, 0, 2, 4, 2, 0, 2, 1, 7,\n        6, 0, 1, 3, 16, 4, 1, 1, 2, 9, 3, 0, 0, 1, 4, 0, 0, 0, 0, 0, 2],\n    percentage=[0.7, 9.1, 18.5, 59.9, 11.7, 18.2, 18.2, 0, 63.6, 0, 20, 0, 20,\n        40, 20, 0, 12.5, 6.3, 43.8, 37.5, 0, 4.2, 12.5, 66.7, 16.7, 6.3, 6.3,\n        12.5, 56.3, 18.8, 0, 0, 20, 80, 0, 0, 0, 0, 0, 100],\n    percentage_start=[-19.1, -18.4, -9.2, 9.2, 69.2, -36.4, -18.2, 0, 0, 63.6,\n        -30, -10, -10, 10, 50, -15.6, -15.6, -3.1, 3.1, 46.9, -10.4, -10.4,\n        -6.3, 6.3, 72.9, -18.8, -12.5, -6.3, 6.3, 62.5, -10, -10, -10, 10, 90,\n        0, 0, 0, 0, 0],\n    percentage_end=[-18.4, -9.2, 9.2, 69.2, 80.9, -18.2, 0, 0, 63.6, 63.6, -10,\n        -10, 10, 50, 70, -15.6, -3.1, 3.1, 46.9, 84.4, -10.4, -6.3, 6.3, 72.9,\n        89.6, -12.5, -6.3, 6.3, 62.5, 81.3, -10, -10, 10, 90, 90, 0, 0, 0, 0, 100]\n)\n\ndata |> @vlplot(\n    :bar,\n    x={:percentage_start, axis={title=\"Percentage\"}},\n    x2=:percentage_end,\n    y={\n        :question, axis={\n            title=\"Question\",\n            offset=5,\n            ticks=false,\n            minExtent=60,\n            domain=false\n        }\n    },\n    color={\n        :typ,\n        legend={title=\"Response\"},\n        scale={\n            domain=[\n                \"Strongly disagree\",\n                \"Disagree\",\n                \"Neither agree nor disagree\",\n                \"Agree\",\n                \"Strongly agree\"\n            ],\n            range=[\"#c30d24\", \"#f3a583\", \"#cccccc\", \"#94c6da\", \"#1770ab\"],\n            typ=:ordinal\n        }\n    }\n)"
},

{
    "location": "examples/examples_barchartshistograms.html#Simple-Bar-Chart-with-Labels-1",
    "page": "Bar Charts & Histograms",
    "title": "Simple Bar Chart with Labels",
    "category": "section",
    "text": "TODO Use shorthand for typ=:text.using VegaLite\n\n@vlplot(\n    data={\n        values=[\n            {a=\"A\",b=28},\n            {a=\"B\",b=55},\n            {a=\"C\",b=43}\n        ]\n    },\n    y=\"a:o\",\n    x=\"b:q\"\n) +\n@vlplot(:bar) +\n@vlplot(\n    mark={\n        typ=:text,\n        align=:left,\n        baseline=:middle,\n        dx=3\n    },\n    enc={\n        text=\"b:q\"\n    }\n)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#",
    "page": "Scatter & Strip Plots",
    "title": "Scatter & Strip Plots",
    "category": "page",
    "text": ""
},

{
    "location": "examples/examples_scatter_strip_plots.html#Scatterplot-1",
    "page": "Scatter & Strip Plots",
    "title": "Scatterplot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:point, x=:Horsepower, y=:Miles_per_Gallon)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Dot-Plot-1",
    "page": "Scatter & Strip Plots",
    "title": "Dot Plot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"seattle-weather\") |>\n@vlplot(:tick, x=:precipitation)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Strip-Plot-1",
    "page": "Scatter & Strip Plots",
    "title": "Strip Plot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:tick, x=:Horsepower, y=\"Cylinders:o\")"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Colored-Scatterplot-1",
    "page": "Scatter & Strip Plots",
    "title": "Colored Scatterplot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:point, x=:Horsepower, y=:Miles_per_Gallon, color=:Origin, shape=:Origin)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Binned-Scatterplot-1",
    "page": "Scatter & Strip Plots",
    "title": "Binned Scatterplot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"movies\") |>\n@vlplot(\n    :circle,\n    x={:IMDB_Rating, bin={maxbins=10}},\n    y={:Rotten_Tomatoes_Rating, bin={maxbins=10}},\n    size=\"count()\"\n)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Bubble-Plot-1",
    "page": "Scatter & Strip Plots",
    "title": "Bubble Plot",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:point, x=:Horsepower, y=:Miles_per_Gallon, size=:Acceleration)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Scatterplot-with-NA-Values-in-Grey-1",
    "page": "Scatter & Strip Plots",
    "title": "Scatterplot with NA Values in Grey",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"movies\") |>\n@vlplot(\n    :point,\n    x=:IMDB_Rating,\n    y=:Rotten_Tomatoes_Rating,\n    color={\n        condition={\n            test=\"datum.IMDB_Rating === null || datum.Rotten_Tomatoes_Rating === null\",\n            value=\"#aaa\"\n        }\n    },\n    config={invalidValues=nothing}\n)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Scatterplot-with-Filled-Circles-1",
    "page": "Scatter & Strip Plots",
    "title": "Scatterplot with Filled Circles",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(:circle, x=:Horsepower, y=:Miles_per_Gallon)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Bubble-Plot-(Gapminder)-1",
    "page": "Scatter & Strip Plots",
    "title": "Bubble Plot (Gapminder)",
    "category": "section",
    "text": "TODO Add interactive selectionusing VegaLite, VegaDatasets\n\ndataset(\"gapminder-health-income\") |>\n@vlplot(\n    :circle,\n    width=500,height=300,\n    y={:health, scale={zero=false}},\n    x={:income, scale={typ=:log}},\n    size=:population,\n    color={value=\"#000\"}\n)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Bubble-Plot-(Natural-Disasters)-1",
    "page": "Scatter & Strip Plots",
    "title": "Bubble Plot (Natural Disasters)",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"disasters\") |>\n@vlplot(\n    width=600,height=400,\n    transform=[\n        {filter=\"datum.Entity !== \'All natural disasters\'\"}\n    ],\n    mark={\n        :circle,\n        opacity=0.8,\n        stroke=:black,\n        strokeWidth=1\n    },\n    enc={\n        x={\"Year:o\", axis={labelAngle=0}},\n        y={:Entity, axis={title=\"\"}},\n        size={\n            :Deaths,\n            legend={title=\"Annual Global Deaths\"},\n            scale={range=[0,5000]}\n        },\n        color={:Entity, legend=nothing}\n    }\n)"
},

{
    "location": "examples/examples_scatter_strip_plots.html#Scatter-Plot-with-Text-Marks-1",
    "page": "Scatter & Strip Plots",
    "title": "Scatter Plot with Text Marks",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"cars\") |>\n@vlplot(\n    :text,\n    transform=[\n        {\n            calculate=\"datum.Origin[0]\",\n            as=\"OriginInitial\"\n        }\n    ],\n    x=:Horsepower,\n    y=:Miles_per_Gallon,\n    color=:Origin,\n    text=\"OriginInitial:n\"\n)"
},

{
    "location": "examples/examples_line_charts.html#",
    "page": "Line Charts",
    "title": "Line Charts",
    "category": "page",
    "text": ""
},

{
    "location": "examples/examples_line_charts.html#Simple-Bar-Chart-1",
    "page": "Line Charts",
    "title": "Simple Bar Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    :line,\n    transform=[\n        {filter=\"datum.symbol==\'GOOG\'\"}\n    ],\n    x={\"date:t\", axis={format=\"%Y\"}},\n    y=:price\n)"
},

{
    "location": "examples/examples_line_charts.html#Line-Chart-with-Overlaying-Point-Markers-1",
    "page": "Line Charts",
    "title": "Line Chart with Overlaying Point Markers",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    transform=[{filter=\"datum.symbol===\'GOOG\'\"}],\n    mark={\n        :line,\n        color=:green,\n        point={\n            color=:red\n        }\n    },\n    x=\"date:t\",\n    y=:price\n)"
},

{
    "location": "examples/examples_line_charts.html#Multi-Series-Line-Chart-1",
    "page": "Line Charts",
    "title": "Multi Series Line Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    :line,\n    x={\"date:t\", axis={format=\"%Y\"}},\n    y=:price,\n    color=:symbol\n)"
},

{
    "location": "examples/examples_line_charts.html#Slope-Graph-1",
    "page": "Line Charts",
    "title": "Slope Graph",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"barley\") |>\n@vlplot(\n    :line,\n    x={\n        \"year:o\",\n        scale={\n            rangeStep=50,\n            padding=0.5\n        }\n    },\n    y=\"median(yield)\",\n    color=:site\n)"
},

{
    "location": "examples/examples_line_charts.html#Step-Chart-1",
    "page": "Line Charts",
    "title": "Step Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    transform=[{filter=\"datum.symbol===\'GOOG\'\"}],\n    mark={\n        :line,\n        interpolate=\"step-after\"\n    },\n    x=\"date:t\",\n    y=:price\n)"
},

{
    "location": "examples/examples_line_charts.html#Line-Chart-with-Monotone-Interpolation-1",
    "page": "Line Charts",
    "title": "Line Chart with Monotone Interpolation",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    transform=[{filter=\"datum.symbol===\'GOOG\'\"}],\n    mark={\n        :line,\n        interpolate=\"monotone\"\n    },\n    x=\"date:t\",\n    y=:price\n)"
},

{
    "location": "examples/examples_line_charts.html#Connected-Scatterplot-(Lines-with-Custom-Paths)-1",
    "page": "Line Charts",
    "title": "Connected Scatterplot (Lines with Custom Paths)",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"driving\") |>\n@vlplot(\n    mark={\n        :line,\n        point=true\n    },\n    x={\n        :miles,\n        scale={zero=false}\n    },\n    y={\n        :gas,\n        scale={zero=false}\n    },\n    order=\"year:t\"\n)"
},

{
    "location": "examples/examples_line_charts.html#Line-Chart-with-Varying-Size-(using-the-trail-mark)-1",
    "page": "Line Charts",
    "title": "Line Chart with Varying Size (using the trail mark)",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    :trail,\n    x={\n        \"date:t\",\n        axis={format=\"%Y\"}\n    },\n    y=:price,\n    size=:price,\n    color=:symbol\n)"
},

{
    "location": "examples/examples_line_charts.html#Line-Chart-with-Markers-and-Invalid-Values-1",
    "page": "Line Charts",
    "title": "Line Chart with Markers and Invalid Values",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\ndata = DataFrame(\n    x=[1,2,3,4,5,6,7],\n    y=[10,30,missing,15,missing,40,20]\n)\n\ndata |>\n@vlplot(\n    mark={\n        :line,\n        point=true\n    },\n    x=:x,\n    y=:y\n)"
},

{
    "location": "examples/examples_line_charts.html#Carbon-Dioxide-in-the-Atmosphere-1",
    "page": "Line Charts",
    "title": "Carbon Dioxide in the Atmosphere",
    "category": "section",
    "text": "TODO"
},

{
    "location": "examples/examples_line_charts.html#Line-Charts-Showing-Ranks-Over-Time-1",
    "page": "Line Charts",
    "title": "Line Charts Showing Ranks Over Time",
    "category": "section",
    "text": "using VegaLite, DataFrames\n\ndata = DataFrame(\n    team=[\"Man Utd\", \"Chelsea\", \"Man City\", \"Spurs\", \"Man Utd\", \"Chelsea\", \"Man City\", \"Spurs\", \"Man Utd\", \"Chelsea\", \"Man City\", \"Spurs\"],\n    matchday=[1,1,1,1,2,2,2,2,3,3,3,3],\n    point=[3,1,1,0,6,1,0,3,9,1,0,6]\n)\n\ndata |>\n@vlplot(\n    transform=[{\n        sort=[{field=\"point\", order=\"descending\"}],\n        window=[{\n            op=\"rank\",\n            as=\"rank\"\n        }],\n        groupby=[\"matchday\"]\n    }],\n    mark={\n        :line,\n        orient=\"vertical\"\n    },\n    x=\"matchday:o\",\n    y=\"rank:o\",\n    color={\n        :team,\n        scale={\n            domain=[\"Man Utd\", \"Chelsea\", \"Man City\", \"Spurs\"],\n            range=[\"#cc2613\", \"#125dc7\", \"#8bcdfc\", \"#d1d1d1\"]\n        }\n    }\n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#",
    "page": "Area Charts & Streamgraphs",
    "title": "Area Charts & Streamgraphs",
    "category": "page",
    "text": ""
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Area-Chart-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Area Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"unemployment-across-industries\") |>\n@vlplot(\n    :area,\n    width=300, height=200,\n    x={\n        \"yearmonth(date):t\",\n        axis={format=\"%Y\"}\n    },\n    y={\n        \"sum(count)\",\n        axis={title=\"count\"}\n    }    \n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Area-Chart-with-Overlaying-Lines-and-Point-Markers-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Area Chart with Overlaying Lines and Point Markers",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"stocks\") |>\n@vlplot(\n    transform=[{filter=\"datum.symbol===\'GOOG\'\"}],\n    mark={\n        :area,\n        line=true,\n        point=true\n    },\n    x=\"date:t\",\n    y=:price\n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Stacked-Area-Chart-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Stacked Area Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"unemployment-across-industries\") |>\n@vlplot(\n    :area,\n    width=300, hieght=200,\n    x={\n        \"yearmonth(date):t\",\n        axis={format=\"%Y\"}\n    },\n    y=\"sum(count)\",\n    color={\n        :series,\n        scale={scheme=\"category20b\"}\n    }\n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Normalized-Stacked-Area-Chart-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Normalized Stacked Area Chart",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"unemployment-across-industries\") |>\n@vlplot(\n    :area,\n    width=300, height=200,\n    x={\n        \"yearmonth(date)\",\n        axis={\n            domain=false,\n            format=\"%Y\"\n        }\n    },\n    y={\n        \"sum(count)\",\n        axis=nothing,\n        stack=:normalize\n    },\n    color={\n        :series,\n        scale={scheme=\"category20b\"}\n    }\n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Streamgraph-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Streamgraph",
    "category": "section",
    "text": "using VegaLite, VegaDatasets\n\ndataset(\"unemployment-across-industries\") |>\n@vlplot(\n    :area,\n    width=300, height=200,\n    x={\n        \"yearmonth(date)\",\n        axis={\n            domain=false,\n            format=\"%Y\",\n            tickSize=0\n        }\n    },\n    y={\n        \"sum(count)\",\n        axis=nothing,\n        stack=:center\n    },\n    color={\n        :series,\n        scale={scheme=\"category20b\"}\n    }\n)"
},

{
    "location": "examples/examples_area_Charts_streamgraphs.html#Horizon-Graph-1",
    "page": "Area Charts & Streamgraphs",
    "title": "Horizon Graph",
    "category": "section",
    "text": "TODO"
},

{
    "location": "userguide/vlspec.html#",
    "page": "Vega-lite specifications",
    "title": "Vega-lite specifications",
    "category": "page",
    "text": ""
},

{
    "location": "userguide/vlspec.html#Vega-lite-specifications-1",
    "page": "Vega-lite specifications",
    "title": "Vega-lite specifications",
    "category": "section",
    "text": "A vega-lite specification is represented as a VLSpec object in julia. There are multiple ways to create a VLSpec object. The previous section demonstrated the use of the julia API to create these specification objects. This section describes three additional ways to create and interact with these specification objects: the vl string macro, functions that load and save specifications from and to disc, and the DataVoyager.jl package."
},

{
    "location": "userguide/vlspec.html#The-vl-string-macro-1",
    "page": "Vega-lite specifications",
    "title": "The vl string macro",
    "category": "section",
    "text": "One can embed a JSON vega-lite specification directly in julia code by using the vl string macro:using VegaLite\n\nspec = vl\"\"\"\n{\n  \"$schema\": \"https://vega.github.io/schema/vega-lite/v2.json\",\n  \"description\": \"A simple bar chart with embedded data.\",\n  \"data\": {\n    \"values\": [\n      {\"a\": \"A\",\"b\": 28}, {\"a\": \"B\",\"b\": 55}, {\"a\": \"C\",\"b\": 43},\n      {\"a\": \"D\",\"b\": 91}, {\"a\": \"E\",\"b\": 81}, {\"a\": \"F\",\"b\": 53},\n      {\"a\": \"G\",\"b\": 19}, {\"a\": \"H\",\"b\": 87}, {\"a\": \"I\",\"b\": 52}\n    ]\n  },\n  \"mark\": \"bar\",\n  \"encoding\": {\n    \"x\": {\"field\": \"a\", \"type\": \"ordinal\"},\n    \"y\": {\"field\": \"b\", \"type\": \"quantitative\"}\n  }\n}\n\"\"\"The resulting VLSpec object is indistinguishable from one that is created via the julia API.The main benefit of this approach is that one can directly leverage JSON vega-lite examples and code."
},

{
    "location": "userguide/vlspec.html#Loading-and-saving-vega-lite-specifications-1",
    "page": "Vega-lite specifications",
    "title": "Loading and saving vega-lite specifications",
    "category": "section",
    "text": "The loadspec and savespec function can be used to load and save vega-lite specifications from disc. The following example loads a vega-lite specification from a file named myfigure.vegalite:using VegaLite\n\nspec = loadspec(\"myfigure.vegalite\")To save a VLSpec to a file on disc, use the savespec function:using VegaLite\n\nspec = ... # Aquire a spec from somewhere\n\nsavespec(\"myfigure.vegalite\", spec)"
},

{
    "location": "userguide/vlspec.html#[DataVoyager.jl](https://github.com/davidanthoff/DataVoyager.jl)-1",
    "page": "Vega-lite specifications",
    "title": "DataVoyager.jl",
    "category": "section",
    "text": "The DataVoyager.jl package provides a graphical UI for data exploration that is based on vega-lite. One can use that tool to create a figure in the UI, and then export the corresponding vega-lite specification for use with this package here."
},

{
    "location": "referencemanual/global.html#",
    "page": "Global settings",
    "title": "Global settings",
    "category": "page",
    "text": ""
},

{
    "location": "referencemanual/global.html#VegaLite.renderer",
    "page": "Global settings",
    "title": "VegaLite.renderer",
    "category": "function",
    "text": "renderer()\n\nshow current rendering mode (svg or canvas)\n\nrenderer(::Symbol)\n\nset rendering mode (svg or canvas)\n\n\n\n"
},

{
    "location": "referencemanual/global.html#VegaLite.actionlinks",
    "page": "Global settings",
    "title": "VegaLite.actionlinks",
    "category": "function",
    "text": "actionlinks()::Bool\n\nshow if plots will have (true) or not (false) the action links displayed\n\nactionlinks(::Bool)\n\nindicate if actions links should be dislpayed under the plot\n\n\n\n"
},

{
    "location": "referencemanual/global.html#Global-settings-1",
    "page": "Global settings",
    "title": "Global settings",
    "category": "section",
    "text": "rendereractionlinksjunoplotpane"
},

{
    "location": "referencemanual/output.html#",
    "page": "Outputs",
    "title": "Outputs",
    "category": "page",
    "text": ""
},

{
    "location": "referencemanual/output.html#Output-1",
    "page": "Outputs",
    "title": "Output",
    "category": "section",
    "text": ""
},

{
    "location": "referencemanual/output.html#On-evaluation-1",
    "page": "Outputs",
    "title": "On evaluation",
    "category": "section",
    "text": ""
},

{
    "location": "referencemanual/output.html#VegaLite.pdf",
    "page": "Outputs",
    "title": "VegaLite.pdf",
    "category": "function",
    "text": "pdf(filename::AbstractString, v::VLSpec{:plot})\n\nSave the plot v as a pdf file with name filename.\n\n\n\n"
},

{
    "location": "referencemanual/output.html#VegaLite.png",
    "page": "Outputs",
    "title": "VegaLite.png",
    "category": "function",
    "text": "png(filename::AbstractString, v::VLSpec{:plot})\n\nSave the plot v as a png file with name filename.\n\n\n\n"
},

{
    "location": "referencemanual/output.html#VegaLite.svg",
    "page": "Outputs",
    "title": "VegaLite.svg",
    "category": "function",
    "text": "svg(filename::AbstractString, v::VLSpec{:plot})\n\nSave the plot v as a svg file with name filename.\n\n\n\n"
},

{
    "location": "referencemanual/output.html#VegaLite.savefig",
    "page": "Outputs",
    "title": "VegaLite.savefig",
    "category": "function",
    "text": "savefig(filename::AbstractString, v::VLSpec{:plot})\n\nSave the plot v as a file with name filename. The file format will be picked based on the extension of the filename.\n\n\n\n"
},

{
    "location": "referencemanual/output.html#Saving-to-a-file-1",
    "page": "Outputs",
    "title": "Saving to a file",
    "category": "section",
    "text": "pdf\npng\nsvgOr you can use a single saving functions that guesses the image format from the extension of the provided filenamesavefig"
},

{
    "location": "referencemanual/functions.html#",
    "page": "API reference",
    "title": "API reference",
    "category": "page",
    "text": ""
},

{
    "location": "referencemanual/functions.html#Functions-1",
    "page": "API reference",
    "title": "Functions",
    "category": "section",
    "text": ""
},

{
    "location": "referencemanual/functions.html#st-level-functions-1",
    "page": "API reference",
    "title": "1st level functions",
    "category": "section",
    "text": "plot\ndata\ntransform\nvlmark\nencoding\nconfig\nlayer\nfacet\nrepeat\nhconcat\nvconcat\nspec\nselection"
},

{
    "location": "referencemanual/functions.html#Mark-functions-1",
    "page": "API reference",
    "title": "Mark functions",
    "category": "section",
    "text": "vltick\nvlbar"
},

{
    "location": "referencemanual/functions.html#Encoding-channels-1",
    "page": "API reference",
    "title": "Encoding channels",
    "category": "section",
    "text": "vlx\nvly\nvlx2\nvly2\nvlcolor\nvlsize\nvlrow\nvlcolumn\nvltooltip\nvlorder\nvldetail\nvlshape\nvlopacity\nvltext"
},

{
    "location": "referencemanual/functions.html#nd-level-functions-1",
    "page": "API reference",
    "title": "2nd level functions",
    "category": "section",
    "text": "vlaxis\nvlscale\nvlsort\nvlformat\nvllegend\nvltitle\nvlvalues\nvlfrom\nvloneOf\nvloverlay\nvlcondition\nvlencode\nvlequal\nvlaxisBand\nvlfilter\nvlscheme\nvlfield\nvlpadding\nvlheader\nvlinterval\nvlbin\nvlbind\nvlsummarize\nvldomain\nvlresolve\nvlcell"
},

]}
