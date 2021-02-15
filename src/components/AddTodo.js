// import React, { useState } from 'react';
// import {
//     Button,
//     Avatar,
//     Drawer,
//     DatePicker,
//     Input,
//     GoogleAddressLookup,
//     Lookup,
//     Select,
//     ButtonMenu,
//     MenuItem,
// } from 'react-rainbow-components';
// import { Field, reduxForm } from 'redux-form';
// import styled from 'styled-components';
// import { Camera } from "@rainbow-modules/icons"

// const countries = [
//     { value: 'ca', label: 'Canada' },
//     { value: 'co', label: 'Colombia' },
//     { value: 'fr', label: 'France' },
//     { value: 'it', label: 'Italy' },
//     { value: 'es', label: 'Spain' },
//     { value: 'mx', label: 'Mexico' },
//     { value: 'uk', label: 'United Kingdom' },
//     { value: 'us', label: 'United States' },
// ];

// const roles = [
//     { value: '', label: 'Select role' },
//     { value: 'manager', label: 'Manager' },
//     { value: 'developer', label: 'Developer' },
// ];

// const StyledExampleHeader = styled.h3.attrs(props => {
//     return props.theme.rainbow.palette;
// })
// `
//     font-family: 'Lato';
//     font-size: 36px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: normal;
//     letter-spacing: 1.19px;
//     text-align: center;
//     color: ${props => props.text.main};
// `;

// const StyledAvatar = styled(Avatar)`
//     width: 100px;
//     height: 100px;
//     box-shadow: 0 2px 4px 0 rgba(6, 28, 63, 0.3);
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
// `;

// const StyledAvatarContainer = styled.div`
//     position: relative;
// `;

// const NameLabel = styled.label.attrs(props => props.theme.rainbow)`
//     font-family: Lato;
//     font-size: 16px;
//     font-weight: 900;
//     text-align: center;
//     color: ${props => props.palette.text.main};
//     display: block;
// `;

// const EmailLabel = styled.span.attrs(props => props.theme.rainbow)`
//     font-family: Lato;
//     font-size: 12px;
//     font-weight: 300;
//     text-align: center;
//     color: ${props => props.palette.text.label};
//     display: block;
// `;

// const DetailsButton = styled(Button)
// `
//     font-size: 0.85rem;
// `;

// const ConctactContainer = styled.div`
//     width: max-content;
// `;

// const FormNameLabel = styled.label.attrs(props => props.theme.rainbow)`
//     font-family: Lato;
//     font-size: 24px;
//     font-weight: 900;
//     line-height: normal;
//     color: ${props => props.palette.text.main};
//     display: block;
// `;

// const FormEmailLabel = styled.span.attrs(props => props.theme.rainbow)`
//     font-family: Lato;
//     font-size: 16px;
//     font-weight: 300;
//     line-height: 1.06;
//     color: ${props => props.palette.text.header};
//     display: block;
// `;

// const StyledFooterButton = styled(Button)
// `
//     width: 100px;
// `;
// const StyledButtonMenu = styled(ButtonMenu)
// `
//     position: absolute;
//     bottom: 0;
//     right: 0;
// `;

// const closeDrawer = () => setState({ isOpen : false });

// const filter = (query, options) => {
//     if (query) {
//         return options.filter(item => {
//             const regex = new RegExp(query, 'i');
//             return regex.test(item.label);
//         });
//     }
//     return [];
// };

// function Contact({ id, avatar, name, email, onShowDetails }) {
//     return (
//         <ConctactContainer className="rainbow-m-around_large">
//             <div className="rainbow-p-around_medium">
//                 <StyledAvatar
//                     src={avatar}
//                     assistiveText={name}
//                     title={name}
//                 />
//             </div>
//             <NameLabel className="rainbow-m-top_small">
//                 {name}
//             </NameLabel>
//             <EmailLabel className="rainbow-m-top_x-small">
//                 {email}
//             </EmailLabel>
//             <div className="rainbow-flex rainbow-justify_space-around">
//                 <DetailsButton
//                     id={id}
//                     className="show-details-button"
//                     variant="base"
//                     label="Details"
//                     onClick={onShowDetails}
//                 />
//             </div>
//         </ConctactContainer>
//     );
// }

// function ConfigButtonMenu(){
//     return (
//         <StyledButtonMenu
//             menuAlignment="right"
//             menuSize="x-small"
//             buttonSize="small"
//             buttonVariant="border-filled"
//             icon={<Camera />}
//             id="edit-profile-photo"
//         >
//             <MenuItem label="Upload a new photo" />
//             <MenuItem label="Open gallery" />
//         </StyledButtonMenu>
//     )
// }

// function EditContactForm(props) {
//     const { contactInfo, handleSubmit } = props;
//     const [countriesList, setCountriesList] = useState(countries);

//     if (!contactInfo) return null;

//     const handleSearch = value => {
//         if (countriesList && contactInfo.country && value.length > contactInfo.country.value.length) {
//             setCountriesList(filter(value, countries));
//         } else if (value) {
//             setCountriesList(filter(value, countries));
//         } else {
//             setCountriesList(null);
//         }
//     };

//     return (
//         <div className="rainbow-p-around_small rainbow-flex rainbow-flex_wrap  rainbow-align-content_center">
//             <div className="rainbow-flex rainbow-flex_wrap">
//                 <StyledAvatarContainer>
//                     <StyledAvatar
//                         src={contactInfo.avatar}
//                         assistiveText={contactInfo.name}
//                         title={contactInfo.name}
//                     />
//                     <ConfigButtonMenu/>
//                 </StyledAvatarContainer>
//                 <div className="rainbow-flex_column rainbow-m-left_medium">
//                     <FormNameLabel className="rainbow-m-top_small">
//                         {contactInfo.name}
//                     </FormNameLabel>
//                     <FormEmailLabel className="rainbow-m-top_xx-small">
//                         {contactInfo.email}
//                     </FormEmailLabel>
//                 </div>
//             </div>
//             <div className="rainbow-flex_column rainbow-m-top_x-large">
//                 <form id="redux-form-id" noValidate onSubmit={handleSubmit}>
//                     <Field
//                         id="contact-birthday-input"
//                         name="birthdate"
//                         component={DatePicker}
//                         placeholder="mm/dd/yyyy"
//                         label="Birthday"
//                     />
//                     <Field
//                         className="rainbow-m-top_large"
//                         component={Input}
//                         name="company"
//                         placeholder="Enter company name"
//                         label="Company"
//                     />
//                     <Field
//                         component={GoogleAddressLookup}
//                         name="location"
//                         apiKey={LIBRARY_GOOGLE_MAPS_APIKEY}
//                         placeholder="Enter location"
//                         label="Address"
//                         className="rainbow-m-top_large"
//                     />
//                     <Field
//                         id="contact-country-input"
//                         className="rainbow-m-top_large"
//                         component={Lookup}
//                         name="country"
//                         label="Country"
//                         placeholder="Select your country"
//                         options={countriesList}
//                         onSearch={handleSearch}
//                     />
//                     <Field
//                         className="rainbow-m-top_large"
//                         component={Select}
//                         name="role"
//                         label="Role"
//                         options={roles}
//                     />
//                     <Field
//                         className="rainbow-m-top_large"
//                         name="skills"
//                         component={Input}
//                         placeholder="Your skills"
//                     />
//                 </form>
//             </div>
//         </div>
//     );
// }

// const Form = reduxForm({
//     form: 'edit-contact-form',
//     touchOnBlur: false,
// })(EditContactForm);

// function DrawerFooter({ onCancel, onSave }) {
//     return (
//         <div className="rainbow-flex rainbow-align-content_center">
//             <div className="rainbow-p-around_small">
//                 <StyledFooterButton
//                     label="Cancel"
//                     onClick={onCancel}
//                 />
//             </div>
//             <div className="rainbow-p-around_small">
//                 <StyledFooterButton
//                     variant="brand"
//                     label="Save"
//                     onClick={onSave}
//                 />
//             </div>
//         </div>
//     )
// }

// function UsersList({ values }) {
//     return values.map((user, index) => {
//         const key = `contact-${index}`;
//         return (
//             <Contact
//                 key={key}
//                 id={key}
//                 name={user.name}
//                 email={user.email}
//                 avatar={user.avatar}
//                 onShowDetails={() => setState({
//                     isOpen: true,
//                     info: user,
//                 })}
//             />
//         );
//     });
// }

// const users = [{
//     avatar: 'images/user/avatar-2.svg',
//     name: 'Jane Doe',
//     email: 'jane@gmail.com',
//     birthdate: '1995-12-01',
//     role: 'developer',
// }, {
//     avatar: 'images/user/avatar-4.svg',
//     name: 'John Doe',
//     email: 'john@gmail.com',
//     birthdate: '1985-02-12',
//     role: 'developer',
// }, {
//     avatar: 'images/user/avatar-5.svg',
//     name: 'Ana Doe',
//     email: 'ana@gmail.com',
//     birthdate: '1998-05-21',
//     role: 'manager',
// }];

// const initialState = { isOpen: false, info: null };

//     <div className="rainbow-m-around_xx-large rainbow-flex_column rainbow-align-content_center">
//         <StyledExampleHeader className="rainbow-p-bottom_small">Contributors</StyledExampleHeader>
//         <div className="rainbow-flex rainbow-flex_wrap">
//             <UsersList values={users} />
//         </div>
//         <Drawer
//             id="drawer-7"
//             header="Edit Information"
//             slideFrom="right"
//             footer={
//                 <DrawerFooter
//                     onCancel={() => closeDrawer()}
//                     onSave={() => closeDrawer()}
//                 />
//             }
//             isOpen={state.isOpen}
//             onRequestClose={() => closeDrawer()}
//         >
//             <Form
//                 contactInfo={state.info}
//                 initialValues={state.info}
//             />
//         </Drawer>
//     </div>