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
            return View();
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

    }
}
