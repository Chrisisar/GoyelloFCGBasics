using System.Web.Helpers;
using AddressBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AddressBook.Controllers
{
    public class AddressBookController : Controller
    {
        //
        // GET: /AddressBook/

        public ActionResult Index()
        {
            for (int i = 0; i <= 15; i++)
            {
                ContactList.AddressBook.Add(new Contact() { FirstName = i.ToString(), AddressLine = "1", City = "1", Email = "1", LastName = "1", PhoneNumber = "123", PostCode = "123", Sex = Contact.Gender.Male });
            }
            return RedirectToAction("ShowContactList");
        }

        public ViewResult AddNewContact()
        {
            return View(new Contact());
        }

        [HttpPost]
        public ActionResult AddNewContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                ContactList.AddressBook.Add(contact);
                return Json(new { Success = true });
            }
            return View(contact);
        }

        public ActionResult EditContact(int ContactID)
        {
            return View(ContactList.AddressBook.Last(m => m.ContactID == ContactID));
        }

        [HttpPost]
        public ActionResult EditContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                ContactList.AddressBook[ContactList.AddressBook.FindIndex(m => m.ContactID == contact.ContactID)] = contact;
                return Json(new { Success = true });
            }
            return View(contact);
        }

        public ActionResult RemoveContact(int ContactID)
        {
            ContactList.AddressBook.Remove(ContactList.AddressBook.Find(m => m.ContactID == ContactID));
            return RedirectToAction("ShowContactList");
        }

        public ActionResult ChangeFavorite(int ContactID)
        {
            ContactList.AddressBook[ContactList.AddressBook.FindIndex(m => m.ContactID == ContactID)].IsFavorite = !ContactList.AddressBook[ContactList.AddressBook.FindIndex(m => m.ContactID == ContactID)].IsFavorite;
            return RedirectToAction("ShowContactList");
        }

        public ViewResult ShowContactList()
        {
            return View();
        }

        public ActionResult RefreshContactList()
        {
            List<WebGridColumn> columns = new List<WebGridColumn>()
            {
                new WebGridColumn {ColumnName = "IsFavorite", Header = "Favorite?", Format = (item) => item.IsFavorite ? "☆" : String.Empty },
                new WebGridColumn {ColumnName = "FirstName", Header = "First name"},
                new WebGridColumn {ColumnName = "LastName", Header = "Last name"},
                new WebGridColumn {ColumnName = "PhoneNumber", Header = "Phone number"},
                new WebGridColumn {ColumnName = "Email", Header = "Email"},
                new WebGridColumn {ColumnName = "Action", Header = "Action", Format = (item) => { return new MvcHtmlString(string.Format("<input type='button' id='Edit_{0}' class='editContactButton' data-id='{0}' value='Edit'><input type='button' id='Remove_{0}' class='removeContactButton' data-id='{0}' value='Remove'>", item.ContactID)); } 
                }
            };

            GridViewModel gridModel = new GridViewModel { Columns = columns, Items = ContactList.AddressBook };

            return PartialView("_ContactListTable", gridModel);
        }

        public ViewResult Test()
        {
            List<WebGridColumn> columns = new List<WebGridColumn>()
            {
                new WebGridColumn {ColumnName = "IsFavorite", Header = "Favorite?", Format = (item) => item.IsFavorite ? "☆" : String.Empty },
                new WebGridColumn {ColumnName = "FirstName", Header = "First name"},
                new WebGridColumn {ColumnName = "LastName", Header = "Last name"},
                new WebGridColumn {ColumnName = "PhoneNumber", Header = "Phone number"},
                new WebGridColumn {ColumnName = "Email", Header = "Email"},
                new WebGridColumn {ColumnName = "Action", Header = "Action", Format = (item) => { return new MvcHtmlString(string.Format("<button id='Edit_{0}' class='editContactButton' data-id='{0}'>Edit</button><button data-id='{0}' class='RemoveContactButton'>Remove</button>", item.ContactID)); } 
                }
            };

            GridViewModel gridModel = new GridViewModel { Columns = columns , Items = ContactList.AddressBook };

            return View(gridModel);
        }
    }
}
