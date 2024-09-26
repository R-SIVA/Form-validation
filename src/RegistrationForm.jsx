import React, { useState } from 'react';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
  // State to hold form inputs and errors
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    address: {
      addr_line1: '',
      addr_line2: '',
      city: '',
      state: '',
      postal: '',
    },
    email: '',
    mobileNumber: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Form validation function
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    else if (!/^[A-Za-z]+$/.test(formData.firstName))
      newErrors.firstName = 'Invalid First Name, only letters allowed';

    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    else if (!/^[A-Za-z]+$/.test(formData.lastName))
      newErrors.lastName = 'Invalid Last Name, only letters allowed';

    // Birth Date validation
    if (!formData.birthDate) newErrors.birthDate = 'Birth Date is required';

    // Gender validation
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Address validation
    if (!formData.address.addr_line1) newErrors.addr_line1 = 'Street Address is required';

    if (!formData.address.city) newErrors.city = 'City is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.address.city))
      newErrors.city = 'Invalid City, only letters and spaces allowed';

    if (!formData.address.state) newErrors.state = 'State is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.address.state))
      newErrors.state = 'Invalid State, only letters and spaces allowed';

    if (!formData.address.postal) newErrors.postal = 'Postal Code is required';
    else if (!/^\d{5,6}$/.test(formData.address.postal))
      newErrors.postal = 'Invalid Postal Code, only 5-6 digits allowed';

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid Email format';
    }

    // Mobile Number validation
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid Mobile Number, must be 10 digits';
    }

    // Phone Number validation (optional)
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid Phone Number, must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, proceed with submission
      console.log('Form data:', formData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Registration Form</h2>
      <p>Fill out the form carefully for registration</p>

      {/* Name Fields in a Single Row */}
      <div className="form-row">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>

      {/* Birth Date and Gender in a Single Row */}
      <div className="form-row">
        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <span className="error">{errors.birthDate}</span>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="N/A">N/A</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
      </div>

      {/* Address Fields */}
      <div className="form-group">
        <label>Street Address:</label>
        <input
          type="text"
          name="address.addr_line1"
          value={formData.address.addr_line1}
          onChange={handleChange}
          placeholder="Enter your street address"
        />
        {errors.addr_line1 && <span className="error">{errors.addr_line1}</span>}
      </div>

      <div className="form-group">
        <label>Street Address Line 2:</label>
        <input
          type="text"
          name="address.addr_line2"
          value={formData.address.addr_line2}
          onChange={handleChange}
          placeholder="Enter additional address line"
        />
      </div>

      {/* City, State, Postal Code in a Column */}
      <div className="form-row">
        <div className="form-group column-group">
          <label>City:</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="form-group column-group">
          <label>State / Province:</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="Enter your state"
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div className="form-group column-group">
          <label>Postal / Zip Code:</label>
          <input
            type="text"
            name="address.postal"
            value={formData.address.postal}
            onChange={handleChange}
            placeholder="Enter postal code"
          />
          {errors.postal && <span className="error">{errors.postal}</span>}
        </div>
      </div>

      {/* Email, Mobile Number, and Phone Number in a Column */}
      <div className="form-row">
        <div className="form-group column-group">
          <label>Student E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ex: myname@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group column-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
        </div>

        <div className="form-group column-group">
          <label>Phone Number (Optional):</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default RegistrationForm;
