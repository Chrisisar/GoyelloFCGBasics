using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
//using AddressBook.Extensions;

namespace AddressBook.Models
{
    public class Contact
    {
        public enum Group {
            Default = 0,
            Family = 1,
            Colleagues = 2,
            Friends = 3,
        }

        public enum Gender
        {
            Other,
            Male,
            Female
        }

        public int ContactID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AddressLine { get; set; }

        public string City { get; set; }

        public string PostCode { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public bool IsFavorite { get; set; }

        public Group AssignedTo { get; set; }

        public Gender Sex { get; set; }

        public Contact()
        {
            if (ContactList.AddressBook.Any())
            {
                ContactID = ContactList.AddressBook.LastOrDefault().ContactID + 1;
            }
            else
            {
                ContactID = 0;
            }
            DateOfBirth = DateTime.Now;
            AssignedTo = Group.Default;
            IsFavorite = false;
        }
    }
}