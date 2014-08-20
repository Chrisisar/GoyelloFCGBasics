using AddressBook.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AddressBook.MetaData
{
    public class ContactMetaData
    {
        [Required()]
        public int ContactID { get; set; }

        [Required(ErrorMessage="First name is required")]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [DisplayName("Last Name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Address line is required")]
        [DisplayName("Address")]
        public string AddressLine { get; set; }

        [Required(ErrorMessage = "City field is required")]
        [DisplayName("City")]
        public string City { get; set; }

        [Required(ErrorMessage = "Post code is required")]
        [DisplayName("Postcode")]
        public string PostCode { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [DisplayName("Phone Number")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Email address is required")]
        [DisplayName("Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "You need to enter contact's birthdate")]
        [DisplayName("Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [DisplayName("Favorite")]
        public bool IsFavorite { get; set; }

        [Required(ErrorMessage = "You need to choose a group for this contact")]
        [DisplayName("Group")]
        public Contact.Group AssignedTo { get; set; }

        [Required(ErrorMessage = "You need to specify the person's sex")]
        public Contact.Gender Sex { get; set; }
    }
}
