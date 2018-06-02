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
