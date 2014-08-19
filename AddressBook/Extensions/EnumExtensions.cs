using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace AddressBook.Extensions
{
    public static class EnumExtensions
    {
        public static IHtmlString EnumDropDownListFor<TModel, TEnum>(this HtmlHelper<TModel> html, Expression<Func<TModel, TEnum>> expression)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, html.ViewData);

            var enumType = Nullable.GetUnderlyingType(metadata.ModelType) ?? metadata.ModelType;

            var enumValues = Enum.GetValues(enumType).Cast<object>();

            var items = from enumValue in enumValues
                        select new SelectListItem
                        {
                            Text = enumValue.ToString(),
                            Value = ((int)enumValue).ToString(),
                            Selected = enumValue.Equals(metadata.Model)
                        };

            return html.DropDownListFor(expression, items, string.Empty, null);
        }

        public static SelectList ToSelectList<TEnum>(this TEnum enumObj) where TEnum : struct
        {
            if (!typeof(TEnum).IsEnum) throw new ArgumentException("An Enumeration type is required.", "enumObj");

            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new
                         {
                             ID = (int)Enum.Parse(typeof(TEnum), e.ToString()),
                             Name = e.ToString()
                         };


            return new SelectList(values, "ID", "Name", ((int)Enum.Parse(typeof(TEnum), enumObj.ToString())).ToString());
        }
    }
}