using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using AddressBook.Extensions;

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

        [Required(ErrorMessage="Name is required")]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [DisplayName("Last Name")]
        public string LastName { get; set; }

        [DisplayName("Address")]
        public string AddressLine { get; set; }

        [DisplayName("City")]
        public string City { get; set; }

        [DisplayName("Postcode")]
        public string PostCode { get; set; }

        [DisplayName("Phone Number")]
        public string PhoneNumber { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Date of Birth")]
        [DataType(DataType.Date)]
        [DateRange("2014/08/18", "2015/01/01")]
        public DateTime DateOfBirth { get; set; }

        [DisplayName("Favorite")]
        public bool IsFavorite { get; set; }

        [Required()]
        [DisplayName("Group")]
        public Group AssignedTo { get; set; }

        [Required(ErrorMessage = "You need to specify the person's sex")]
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
            AssignedTo = Group.Default;
            IsFavorite = false;
        }
    }
}