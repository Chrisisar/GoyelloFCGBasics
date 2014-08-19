using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace AddressBook.Models
{
    public class GridViewModel
    {
        public IEnumerable<object> Items { get; set; }

        public IList<WebGridColumn> Columns { get; set; }

        public bool CanPage { get; set; }
        public int RowsPerPage { get; set; }

        public GridViewModel()
        {
            RowsPerPage = 10;
            CanPage = true;
        }
    }
}