var contactFieldsArray =  [
    { name : "_id", display_name: 'Source _Id', visible: false},
    { name: "address", display_name: 'Address', visible: true,
      fields: ["address","country", "province", "postal_code",	"type", "province", "postal_code"]
    },
    { name: "birth_date", display_name: 'Date of Birth', visible: true},
    { name: "city", display_name: 'City', visible: true, default: true},
    { name: "contact_sub_type", display_name: 'Contact Sub-type', visible: true,
      options: [null,
              "International Friend of Equal Education",
              "",
              "Youth",
              "Activist",
              "Staff",
              "South African Friend of Equal Education",
              "Civil Society",
              "Other",
              "Media",
              "Bookery",
              "Government Official",
              "Parent",
              "International Government",
              "Teacher"]
    },
    { name: "contact_type", display_name: 'Contact Type', visible: true, default: true,
      options:[ "Individual", "Organization", "" ]
    },
    { name: "country", display_name: 'Country', visible: true},
    { name: "cellphone", display_name: 'Cellphone', visible: true, default: true},
    { name: "date_of_joining_ee", display_name: 'Date of Joining EE', visible: true},
    { name: "deceased_date", display_name: 'Deceased Date', visible: false },
    { name: "display_name", display_name: 'Preferred Name', visible: true},
    { name: "do_not_email", display_name: 'Do not email', visible: true, options:[ "True", "False", "" ]},
    { name: "do_not_mail", display_name: 'Do not mail', visible: true, options:[ "True", "False", "" ] },
    { name: "do_not_phone", display_name: 'Do not phone', visible: true, options:[ "True", "False", "" ]},
    { name: "do_not_sms", display_name: 'Do not sms', visible: true, options:[ "True", "False", "" ]},
    { name: "do_not_trade", display_name: 'Do not trade', visible: true, options:[ "True", "False", "" ]},
    { name: "email", display_name: 'Email', visible: true, default: true},
    { name: "first_name", display_name: 'First Name', visible: true, default: true},
    { name: "gender", display_name: 'Gender', visible: true, default: true,
      options:[ "Male", "Female", "" ]
    },
    { name: "grade", display_name: 'Grade', visible: true},
    { name: "last_name", display_name: 'Last name', visible: true, default: true},
    { name: "legal_name", display_name: 'Legal Name', visible: true},
    { name: "member", display_name: 'Member', visible: true,
      options:[ "Member", "" ]
    },
    { name: "isMember", display_name: 'Is Member', visible: true,
      options:[ "false", "true" ]
    },
    { name: "middle_name", display_name: 'Middle name', visible: true, default: true},
    { name: "nick_name", display_name: 'Nick Name', visible: true},
    { name: "note", display_name: 'Note', visible: true},
    { name: "organization_name", display_name: 'Organization Name', visible: true},
    { name: "phone", display_name: 'Phone Numbers', visible: true, default: true,
      fields: ["type", "phone"]
    },
    { name: "postal_code", display_name: 'Postal Code', visible: true},
    { name: "preferred_communication_method", display_name: 'Preferred communication method', visible: true},
    { name: "preferred_language", display_name: 'Preferred Language', visible: true},
    { name: "province", display_name: 'Province', visible: true,
      options: ["",
                "Eastern Cape",
                "Free State",
                "Gauteng",
                "Kwazulu-Natal",
                "Mpumalanga",
                "Northern Cape",
                "Limpopo",
                "Western Cape",
                "North West"]
    },
    { name: "school", display_name: 'School', visible: true},
    { name: "suburb", display_name: 'Suburb', visible: true, default: true},
    { name: "website", display_name: 'Website URL', visible: true},
    { name: "year_group", display_name: 'Year Group', visible: true},
    { name: "youth_group", display_name: 'Youth Group', visible: true}];

    // { name: "image_URL", display_name: 'Image URL', visible: true},
    // { name: "legal_identifier", display_name: 'Legal Identifier', visible: true},

    // { name: "addressee_custom", display_name: 'Address - Custom', visible: false},
    // { name: "addressee_display", display_name: 'Address - Display', visible: false},
    // { name: "api_name", display_name: 'Identifier', visible: false},
    // { name: "email_greeting_custom", display_name: 'Email Greeting - Custom', visible: false},
    // { name: "email_greeting_display", display_name: 'Email Greeting - Display', visible: false},
    // { name: "email_greeting_id", display_name: 'Email Greeting - Id', visible: false},
    // { name: "employer_id", display_name: 'Employer Id', visible: false},
    // { name: "external_identifier", display_name: 'External Identifer', visible: false},

    // { name: "hash", display_name: 'Hash', visible: false},
    // { name: "household_name", display_name: 'Household Name', visible: false},
    // { name: "id", display_name: 'Id', visible: false},

    // { name: "postal_greeting_custom", display_name: 'Postal Greeting - Custom', visible: false},
    // { name: "postal_greeting_display", display_name: 'Postal Greeting - Display', visible: false},
    // { name: "postal_greeting_id", display_name: 'Postal Greeting - Id', visible: false},

    // { name: "preferred_mail_format", display_name: 'Preferred Mail Format', visible: false},
    // { name: "prefix_id", display_name: 'Prefix Id', visible: false},
    // { name: "primary_contact_id", display_name: 'Primary Contact Id', visible: false},

    // { name: "sic_code", display_name: 'Sic Code', visible: false},
    // { name: "sort_name", display_name: 'Sort Name', visible: false},
    // { name: "source", display_name: 'Source', visible: false},
    // { name: "suffix_id", display_name: 'Suffix Id', visible: false},


  Meteor.startup(function () {
    if (ContactFields.find().count() === 0) {
      console.log("Importing Contact Fields")
      contactFieldsArray.forEach(function(contactField) {
        ContactFields.insert(contactField);

      });
    }



  });
