using System;
using System.Collections.Generic;

namespace SullyPanta_Leccion.Models;

public partial class Iproducto
{
    public int Id { get; set; }

    public string Codigo { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public int Tipo { get; set; }

    public decimal Precio { get; set; }

    public int Cantidad { get; set; }

    public decimal Subtotal { get; set; }

    public virtual TipoProducto TipoNavigation { get; set; } = null!;
}
