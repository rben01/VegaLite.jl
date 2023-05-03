function convert_vl_to_x(v::VLSpec, fileformat; cmd_args="")
    script_path = vegalite_app_path("node_modules", "vega-lite", "bin", "vl2$fileformat")

    data = get(v.params, "data", nothing)
    if data !== nothing
        values = pop!(data, "values", nothing)
        if values !== nothing
            (path, io) = mktemp(; cleanup=false)
            println(path)
            JSON.print(io, values)
            close(io)
            data["url"] = "file://$path"
            data["format"] = OrderedDict("type" => "json")
        end
    end

    p = open(Cmd(`$(NodeJS_18_jll.node()) $script_path $cmd_args`, dir=vegalite_app_path()),"r+")
    writer = @async begin
        our_json_print(p, v)
        close(p.in)
    end
    reader = @async read(p, String)
    wait(p)
    res = fetch(reader)
    if p.exitcode != 0
        throw(ArgumentError("Invalid spec"))
    end
    return res
end

Base.Multimedia.istextmime(::MIME{Symbol("application/vnd.vegalite.v5+json")}) = true

function Base.show(io::IO, m::MIME"application/vnd.vegalite.v5+json", v::VLSpec)
    our_json_print(io, v)
end

function Base.show(io::IO, m::MIME"application/vnd.vega.v5+json", v::VLSpec)
    print(io, convert_vl_to_x(v, "vg"))
end

function Base.show(io::IO, m::MIME"image/svg+xml", v::VLSpec)
    print(io, convert_vl_to_x(v, "svg"))
end

function Base.show(io::IO, m::MIME"application/pdf", v::VLSpec)
    if vegaliate_app_includes_canvas[]
        print(io, convert_vl_to_x(v, "pdf"))
    else
        error("Not yet implemented.")
        # svgstring = convert_vl_to_svg(v)

        # r = Rsvg.handle_new_from_data(svgstring)
        # d = Rsvg.handle_get_dimensions(r)

        # cs = Cairo.CairoPDFSurface(io, d.width,d.height)
        # try
        #     c = Cairo.CairoContext(cs)
        #     Rsvg.handle_render_cairo(c,r)
        # finally
        #     Cairo.finish(cs)
        # end
    end
end

# function Base.show(io::IO, m::MIME"application/eps", v::VLSpec)
#     svgstring = convert_vl_to_svg(v)

#     r = Rsvg.handle_new_from_data(svgstring)
#     d = Rsvg.handle_get_dimensions(r)

#     cs = Cairo.CairoEPSSurface(io, d.width,d.height)
#     try
#         c = Cairo.CairoContext(cs)
#         Rsvg.handle_render_cairo(c,r)
#     finally
#         Cairo.finish(cs)
#     end
# end

function Base.show(io::IO, m::MIME"image/png", v::VLSpec)
    if vegaliate_app_includes_canvas[]
        if haskey(io, :ppi)
            print(io, convert_vl_to_x(v, "png", cmd_args="--ppi=$(io[:ppi])"))
        else
            print(io, convert_vl_to_x(v, "png"))
        end
    else
        error("Not yet implemented.")
        # svgstring = convert_vl_to_svg(v)

        # r = Rsvg.handle_new_from_data(svgstring)
        # d = Rsvg.handle_get_dimensions(r)

        # cs = Cairo.CairoImageSurface(d.width,d.height,Cairo.FORMAT_ARGB32)
        # c = Cairo.CairoContext(cs)
        # Rsvg.handle_render_cairo(c,r)
        # Cairo.write_to_png(cs,io)
    end
end

function Base.show(io::IO, m::MIME"application/vnd.julia.fileio.htmlfile", v::VLSpec)
    writehtml_full(io, v)
end

function Base.show(io::IO, m::MIME"application/prs.juno.plotpane+html", v::VLSpec)
    writehtml_full(io, v)
end

Base.showable(m::MIME"text/html", v::VLSpec) = isdefined(Main, :PlutoRunner)
function Base.show(io::IO, m::MIME"text/html", v::VLSpec)
    writehtml_partial_script(io, v)
end
