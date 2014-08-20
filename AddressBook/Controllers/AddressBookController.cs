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
                return RedirectToAction("ShowContactList");
            }
            return View();
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
                return RedirectToAction("ShowContactList");
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
            
            return View(ContactList.AddressBook);
        }

        public ViewResult Test()
        {
            List<WebGridColumn> columns = new List<WebGridColumn>()
            {
                new WebGridColumn {ColumnName = "IsFavorite", Header = "Favorite?", Format = (item) => item.IsFavorite ? "☆" : String.Empty },
                new WebGridColumn {ColumnName = "FirstName", Header = "First name"},
                new WebGridColumn {ColumnName = "LastName", Header = "Last name"},
                new WebGridColumn {ColumnName = "PhoneNumber", Header = "Phone number"},
                new WebGridColumn {ColumnName = "Email", Header = "Email"}
            };

            GridViewModel gridModel = new GridViewModel { Columns = columns , Items = ContactList.AddressBook };

            return View(gridModel);
        }
    }
}
