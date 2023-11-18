using System;
using System.Collections.Generic;

namespace SullyPanta_Leccion.Models;

public partial class TipoProducto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Iproducto> Iproductos { get; } = new List<Iproducto>();
}
