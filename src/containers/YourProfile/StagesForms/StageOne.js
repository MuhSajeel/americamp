import React, { Component } from 'react';
import {
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import { MiddleButton } from '../../../components/PaymentOptions';
import { FormDetail } from '../../../components/YourProfileScreens/Form/index';
import styles from './styles';
import {
  Heading,
  SubHeading,
  BottomButtonLeft,
  RadioButton
} from '../../../components/common';
import {
  APPLICATION_STATUS,
  PAYMENT_TRANSACTIONS,
  INTERVIEW_STATUS_TITLE,
  TERMS_AND_CONDITIONS_NAV,
  CURRENT_EMPLOYMENT_STATUS,
  EXP_SPECIAL_NEEDS,
  SELECT_SPECIAL_NEEDS,
  AGE_GROUP,
  RELIGIOUS_CAMPS,
  RETURN_TO_CAMP,
  NEW_APPLICANT,
  BLACK_COLOR,
  CAMP_COUNSELOR_ROLE,
  CAMP_ROLES,
  APP_COLOR,
  PLACEHOLDER_COLOR
} from '../../../constants';

const { width } = Dimensions.get('window');

class StageOneForm extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate(APPLICATION_STATUS);
    return true;
  };

  renderSkills = data => {
    return data.skills.map((item, index) => {
      return (
        <FormDetail
          key={index}
          title={`${index + 1}. ${item.name}`}
          value={item.detail}
        />
      );
    });
  };
  renderRoles = role => {
    return role.map((item, index) => {
      return (
        <View>
          <Heading extraStyling={{ fontSize: 22, lineHeight: 30 }}>
            {index + 1}.
          </Heading>
          <FormDetail key={index} value={CAMP_ROLES[item]} />
        </View>
      );
    });
  };
  renderPreviousVisaDetails = data => {
    return data.visa_informations.previous_visa_details.map((item, index) => {
      const { visa_type, sponsor_name, year_of_participation } = item;
      return (
        <View key={index}>
          <Heading extraStyling={{ fontSize: 22, lineHeight: 30 }}>
            {index + 1}.
          </Heading>
          <FormDetail title='Visa Type' value={visa_type} />
          <FormDetail title='Sponsor Name' value={sponsor_name} />
          <FormDetail
            title='Year Of Participation'
            value={year_of_participation}
          />
        </View>
      );
    });
  };
  renderData = data => {
    return data.map(item => {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              borderColor: BLACK_COLOR,
              borderWidth: 1
            }}
            source={{
              uri: item.url
            }}
            indicator={Progress.Pie}
            indicatorProps={{
              borderWidth: 0,
              color: APP_COLOR,
              unfilledColor: PLACEHOLDER_COLOR
            }}
            resizeMethod='resize'
            key={item.url}
          />
        </View>
      );
    });
  };

  render() {
    const data = this.props.fetchedUserProfile;
    const { navigate } = this.props.navigation;
    const {
      screenContainer,
      buttonContainer,
      imageContainer,
      bottomLine
    } = styles;

    const { application_type, role } = data.apply_now;

    const {
      first_name,
      last_name,
      middle_name,
      gender,
      dob,
      citizenship,
      // country,
      contact_number,
      driving_license,
      skype_name,
      mobile_number,
      start_date: personal_info_start_date,
      end_date: personal_info_end_date,
      city_of_birth: personal_info_city_of_birth,
      country_of_birth: personal_info_country_of_birth
    } = data.personal_info;

    const {
      city,
      state,
      postcode,
      country: current_address_country,
      address_line1,
      address_line2
    } = data.addresses.current_address.address;

    const {
      city: mailing_address_city,
      state: mailing_address_state,
      postcode: mailing_address_postcode,
      country: mailing_address_country,
      address_line1: mailing_address_address_line1,
      address_line2: mailing_address_address_line2
    } = data.addresses.mailing_address.address;

    const {
      studied_at_college,
      current_educational_status,
      currently_studying,
      name_of_university,
      course_title,
      began_studies,
      expected_graduation_date,
      summer_holiday_from,
      summer_holiday_to,
      extra_detail
    } = data.educational_background;

    const {
      work_at_camp,
      positive_impact_at_camp,
      why_hire_you,
      at_traditional_day_camp,
      at_residential_camp,
      with_female_campers,
      with_male_campers,
      with_family_groups,
      with_children,
      with_no_running_water,
      with_no_electricity,
      camp_with_platform_tent,
      special_need_camp,
      why_special_need_camp,
      exp_special_needs,
      exp_special_need_camp,
      select_special_needs,
      age_group,
      provide_personal_care,
      religious_camps,
      religious_camp,
      religious_camp_details,
      comfortable_with_others,
      affiliated_with_ymca,
      ymca_camp_detail,
      camp_roles
    } = data.job_preference;

    const { about_yourself, contribute_to_camp } = data.personal_statement;
    const {
      ever_worked_in_camp,
      prev_work_exp,
      exp_with_childern,
      work_status,
      current_employment_status,
      employer_name,
      position,
      location,
      start_date: workExperienceStartDate,
      end_date: workExperienceEndDate
    } = data.work_experience;

    const {
      any_medical_condition,
      condition_details,
      any_allergy,
      allergy_details,
      are_you_in_good_health,
      convicted_of_crime,
      conviction_details,
      smoke,
      tattoos_or_body_piercing,
      tattoos_or_piercing_details,
      willing_to_remove_piercing
    } = data.medical_history;
    const { additional_documents, photograph_upload } = data.documents;
    const {
      camp_employee_name,
      camp_director,
      camp_email,
      camp_phone
    } = data.camp_information;

    const {
      country_of_legal_residence,
      number_of_j1_visas,
      j1_summer_work_visas,
      us_visa_denial,
      visa_denial_detail
    } = data.visa_informations;

    const { requested_on, status, starts_at } = data.interview;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={screenContainer}>
            <View style={{ alignItems: 'center' }}>
              <Heading>Stage 1</Heading>
            </View>

            <View style={imageContainer}>
              <Avatar
                size='xlarge'
                rounded
                source={{
                  uri: photograph_upload[0]
                }}
              />
              <Text>{data.email}</Text>
            </View>
            {application_type !== RETURN_TO_CAMP ? (
              <View>
                <View
                  style={{
                    paddingTop: 20,
                    alignItems: 'center'
                  }}
                >
                  <View style={{ paddingBottom: 16, flex: 1 }}>
                    <Heading extraStyling={{ fontSize: 40 }}>
                      Interview Details
                    </Heading>

                    <FormDetail
                      title='Status'
                      value={INTERVIEW_STATUS_TITLE[status]}
                    />
                    <FormDetail title='Requested Date' value={requested_on} />
                    <FormDetail title='Requested Timings:' value={starts_at} />
                  </View>
                </View>
              </View>
            ) : null}
            <View style={{ paddingBottom: 16, paddingTop: 30 }}>
              <Heading extraStyling={{ fontSize: 40 }}>
                Personal Information
              </Heading>
              <FormDetail
                title='First Name'
                description='As Stated In Passport'
                value={first_name}
              />
              {middle_name ? (
                <FormDetail
                  title='Middle Name'
                  description='As Stated In Passport'
                  value={middle_name}
                />
              ) : null}
              <FormDetail
                title='Last Name'
                description='As Stated In Passport'
                value={last_name}
              />
              <FormDetail
                title='Country of Citizenship'
                value={citizenship}
                description='As Stated In Passport'
              />
              <FormDetail
                title='Date of Birth'
                value={dob}
                description='YOU MUST BE MINIMUM OF 18 Before JUNE 1ST 2020'
              />
              <FormDetail title='Gender' value={gender} />
              <FormDetail
                title='City of Birth'
                value={personal_info_city_of_birth}
              />
              <FormDetail
                title='Country of Birth'
                value={personal_info_country_of_birth}
              />
              <FormDetail
                title='Dates Available To Work'
                value={personal_info_start_date}
                description={`Most people do AmeriCamp from June 15th until August 15th.
Placements can start as early as May 1st and end as late as September 30th.
The more availability you have the better. If you're worried about exam dates please put June 10th as available from.
In our experience, nearly all exams are completed by this date!`}
                question='Start Date'
              />
              <FormDetail
                value={personal_info_end_date}
                question='Finish Date'
              />
              {contact_number ? (
                <FormDetail title='Contact Number' value={contact_number} />
              ) : null}
              {mobile_number ? (
                <FormDetail title='Mobile Number' value={mobile_number} />
              ) : null}

              <FormDetail
                title='Driving License'
                value={driving_license || 'No'}
                question="Do You have a driver's license?"
              />
              {skype_name ? (
                <FormDetail title='Skype' value={skype_name} />
              ) : null}
            </View>
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Address Details
              </Heading>
              <Heading extraStyling={{ fontSize: 22, lineHeight: 30 }}>
                Current Address
              </Heading>
              <FormDetail title='Address Line 1' value={address_line1} />
              {address_line2 ? (
                <FormDetail title='Address Line 2' value={address_line2} />
              ) : null}
              <FormDetail title='Town' value={city} />
              <FormDetail title='State/Province' value={state} />

              <FormDetail title='Postal Code' value={postcode} />
              <FormDetail title='Country' value={current_address_country} />
              <Heading extraStyling={{ fontSize: 22, lineHeight: 30 }}>
                Mailing Address
              </Heading>
              {address_line1 != mailing_address_address_line1 ? (
                <View>
                  <FormDetail
                    title='Address Line 1'
                    value={mailing_address_address_line1}
                  />
                  {mailing_address_address_line2 ? (
                    <FormDetail
                      title='Address Line 2'
                      value={mailing_address_address_line2}
                    />
                  ) : null}
                  <FormDetail title='Town' value={mailing_address_city} />
                  <FormDetail
                    title='State/Province'
                    value={mailing_address_state}
                  />

                  <FormDetail
                    title='Postal Code'
                    value={mailing_address_postcode}
                  />
                  <FormDetail title='Country' value={mailing_address_country} />
                </View>
              ) : (
                <View style={{ paddingLeft: 10 }}>
                  <RadioButton
                    Default
                    options={[
                      {
                        label: 'Same as current address',
                        value: 1
                      }
                    ]}
                    checked
                    formHorizontal
                    onPress={() => null}
                  />
                </View>
              )}
            </View>
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>
                Education History
              </Heading>
              <FormDetail description='To be a camp counselor you dont have to be a current or previous student. 95% of all applicants choose to be a camp counselor.' />
              <FormDetail
                title='ARE YOU CURRENTLY A FULL-TIME STUDENT?'
                value={studied_at_college || 'No'}
              />
              {studied_at_college ? (
                <View>
                  <FormDetail
                    title='Category best describes your current education status'
                    value={
                      current_educational_status !== 'Other'
                        ? current_educational_status
                        : currently_studying
                    }
                  />
                  {/* {current_educational_status === "Other" ? (
                    <FormDetail
                      title="Description"
                      value={currently_studying}
                    />
                  ) : null} */}
                  <FormDetail
                    title='College/University Name'
                    value={name_of_university}
                  />
                  <FormDetail
                    title='Course Title/ Major'
                    value={course_title}
                  />
                  <FormDetail
                    title='Graduation Start Date'
                    value={began_studies}
                  />
                  <FormDetail
                    title='Expected Graduation Date'
                    value={expected_graduation_date}
                  />
                  <FormDetail
                    title='Summer Holidays Start Date'
                    value={summer_holiday_from}
                  />
                  <FormDetail
                    title='Summer Holidays End Date'
                    value={summer_holiday_to}
                  />
                </View>
              ) : null}
              <FormDetail
                title='Educational Background'
                description='Please tell us about your family and educational background, your interests and spare time activities, your future plans and anything else which you think will be helpful to your application:'
                descriptionMin
                value={extra_detail}
              />
            </View>
            {application_type !== NEW_APPLICANT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Camp Information
                </Heading>
                <FormDetail
                  title='Camp Name'
                  description='Name of the camp employing you in 2020'
                  value={camp_employee_name}
                />
                <FormDetail title='Camp Director' value={camp_director} />
                <FormDetail title='Camp Email' value={camp_email} />
                <FormDetail title='Camp Phone Number' value={camp_phone} />
              </View>
            ) : null}
            {application_type == NEW_APPLICANT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Job Preferences
                </Heading>
                <FormDetail
                  value={work_at_camp}
                  question={'WHY DO YOU WISH TO WORK AT CAMP?'}
                  descriptionMax
                />
                <FormDetail
                  value={positive_impact_at_camp}
                  question={
                    'HOW DO YOU THINK YOU CAN HAVE A POSITIVE IMPACT AT CAMP?'
                  }
                  descriptionMax
                />
                <FormDetail
                  value={why_hire_you}
                  question={'WHY SHOULD CAMP HIRE YOU?'}
                  descriptionMax
                />
                <FormDetail
                  title='Your Working Environment'
                  description='Are You comfortable with the following Roles?'
                />
                <FormDetail
                  question='At a traditional day camp?'
                  value={at_traditional_day_camp || 'No'}
                />
                <FormDetail
                  question='At a residential camp?'
                  value={at_residential_camp || 'No'}
                />
                <FormDetail
                  question='With female campers?'
                  value={with_female_campers || 'No'}
                />
                <FormDetail
                  question='With male campers?'
                  value={with_male_campers || 'No'}
                />
                <FormDetail
                  question='With family groups?'
                  value={with_family_groups || 'No'}
                />
                <FormDetail
                  question='With children from an underpriviledged background?'
                  value={with_children || 'No'}
                />
                <FormDetail
                  question='At a camp with no running water?'
                  value={with_no_running_water || 'No'}
                />
                <FormDetail
                  question='At a camp with no electricity?'
                  value={with_no_electricity || 'No'}
                />
                <FormDetail
                  question='At a camp where you live in a platform tent?'
                  value={camp_with_platform_tent || 'No'}
                />

                <FormDetail
                  title='Special Needs Camps'
                  description={`If you really want to make a difference in the Summer there is no greater feeling than working with people that have special needs.
Camps will provide full training and no previous experience is necessary.`}
                  question='Are you interested in working at a special needs camp?'
                  value={special_need_camp || 'No'}
                />
                {special_need_camp ? (
                  <View>
                    <FormDetail
                      title='Special Needs Camps Requests'
                      question='Why are you interested in working at a camp serves campers with special needs?'
                      value={why_special_need_camp || 'No'}
                      descriptionMax
                    />

                    <FormDetail
                      question='Which special needs populations you have experience working or
                  volunteering with:'
                      value={EXP_SPECIAL_NEEDS[exp_special_needs]}
                    />
                    <FormDetail
                      question='If you have experience, please describe (be specific with regards to age, special needs, your resposibility etc):'
                      value={exp_special_need_camp || 'No'}
                      descriptionMax
                    />
                    {select_special_needs ? (
                      <FormDetail
                        question='Which special needs populations you are willing to work with at camp this summer:'
                        value={SELECT_SPECIAL_NEEDS[select_special_needs]}
                      />
                    ) : null}
                    <FormDetail
                      question='Which special needs age groups you are willing to work with at camp this summer?'
                      value={AGE_GROUP[age_group]}
                    />

                    <FormDetail
                      question='Are you willing to provide personal care to campers (helping with lifting them,
                  showering, toileting, dressing etc)?'
                      value={provide_personal_care || 'No'}
                    />
                  </View>
                ) : null}
                <FormDetail
                  title='Religious or Faith Based Camps'
                  description='Nearly all camps in America were originally founded with a faith-based philosophy.'
                  value={religious_camps || 'No'}
                  question='Are you interested in working at a camp with an active faith-based program?'
                />
                {religious_camps ? (
                  <View>
                    <FormDetail
                      value={RELIGIOUS_CAMPS[religious_camp]}
                      question='Which type of faith based camp you are interested in working with?'
                    />
                    <FormDetail
                      question='Why are you interested in working at a camp with a faith-based program?'
                      value={religious_camp_details}
                      descriptionMax
                    />
                    <FormDetail
                      question='Would you be comfortable working around people whose faith is different than your own
              (this may involve being in contact with food that you would not normally be around, such
              as pork?)'
                      value={comfortable_with_others || 'No'}
                    />
                  </View>
                ) : null}
                <FormDetail
                  title='YMCA Affiliation'
                  question='Are you affiliated or belong to a YMCA organization in your country?'
                  value={affiliated_with_ymca || 'No'}
                />
                {affiliated_with_ymca ? (
                  <FormDetail
                    descriptionMax
                    question='Please tell us about your relationship with the YMCA in your home country:'
                    value={ymca_camp_detail}
                  />
                ) : null}
              </View>
            ) : null}

            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>Work Experience</Heading>
              <FormDetail
                title='Work at Camp in USA'
                value={ever_worked_in_camp || 'No'}
                question='HAVE YOU WORKED AT A CAMP IN THE USA BEFORE?'
              />
              {ever_worked_in_camp ? (
                <FormDetail
                  title='Previous Work Experience'
                  question='Please list camps and years'
                  descriptionMin
                  value={prev_work_exp}
                />
              ) : null}

              <FormDetail
                title='Experience with Children'
                descriptionMin
                value={exp_with_childern}
                question='Please describe your history working with children, including if you have worked at a summer camp before. Talk about age of children, any special needs etc.'
              />

              <FormDetail
                title='EMPOLYMENT AND VOLUNTEER HISTORY'
                question='Are you currently in full or part-time employment?'
                value={work_status || 'No'}
              />
              {work_status ? (
                <View>
                  <FormDetail
                    title='Your Current Employment Status'
                    value={CURRENT_EMPLOYMENT_STATUS[current_employment_status]}
                  />
                  <FormDetail title='Employer Name' value={employer_name} />
                  <FormDetail title='Position' value={position} />
                  <FormDetail title='Location' value={location} />
                  <FormDetail
                    title='Dates Worked From'
                    value={workExperienceStartDate}
                  />
                  {workExperienceStartDate == workExperienceEndDate ? (
                    <FormDetail title='To' value='Currently Employed' />
                  ) : (
                    <FormDetail title='To' value={workExperienceEndDate} />
                  )}
                </View>
              ) : null}
            </View>
            {application_type !== NEW_APPLICANT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Personal Statement
                </Heading>
                <FormDetail
                  title='Personal Statement'
                  value={about_yourself}
                  description='Please tell us about your family and educational background, your interests and spare time activities, your future plans and anything else you think will be helpful to your application'
                />
                <FormDetail
                  question='WHAT DO YOU THINK YOU CAN CONTRIBUTE TO CAMP?'
                  description2='Maximum 1000 characters'
                  value={contribute_to_camp}
                />
              </View>
            ) : null}

            {application_type === NEW_APPLICANT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Skills, Talents & Certificates
                </Heading>
                {role === CAMP_COUNSELOR_ROLE ? (
                  <View>
                    <FormDetail
                      description='Please explain your qualifications and/or experience. Be detailed
              employers want to see how experienced and qualified you are and
              this is the place to impress them:'
                    />
                    {this.renderSkills(data)}
                  </View>
                ) : (
                  <View>
                    <Heading extraStyling={{ fontSize: 28, lineHeight: 30 }}>
                      Support Staff Skills
                    </Heading>
                    <FormDetail title='Your Prefered Camp Roles' />
                    {this.renderRoles(camp_roles)}
                  </View>
                )}
              </View>
            ) : null}
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>Medical History</Heading>

              <FormDetail
                title='your Medical history and background'
                question='DO YOU HAVE ANY MEDICAL CONDITIONS THAT MAY AFFECT YOUR APPLICATION?'
                value={any_medical_condition || 'No'}
              />
              {any_medical_condition ? (
                <FormDetail
                  title='Your Medical Condition'
                  value={condition_details}
                />
              ) : null}
              <FormDetail
                title='DO YOU HAVE ANY ALLEGIES?'
                value={any_allergy || 'No'}
                question='DO YOU HAVE ANY ALLEGIES THAT MAY AFFECT YOUR APPLICATION?'
              />
              {any_allergy ? (
                <FormDetail
                  title='Your Allergy Details'
                  value={allergy_details}
                />
              ) : null}
              <FormDetail
                title='GENERAL HEALTH OVERVIEW?'
                value={are_you_in_good_health || 'No'}
                question=' ARE YOU IN GOOD HEALTH, FIT, AND ABLE TO PARTICIPATE IN AND LEAD CAMP ACTIVITIES?'
              />
              {/* <FormDetail title="Background Information" /> */}
              <FormDetail
                title='Background Information'
                value={convicted_of_crime || 'No'}
                question='HAVE YOU EVER BEEN CONVICTED, OR ACCUSED OF ANY CRIME INCLUDING CHILD ABUSE OR SEXUAL ABUSE?'
              />
              {convicted_of_crime ? (
                <FormDetail
                  question='Crime Information'
                  value={conviction_details}
                />
              ) : null}
              <FormDetail question=' Do You Smoke?' value={smoke || 'No'} />
              <FormDetail
                question='DO YOU HAVE ANY TATTOOS OR BODY PIERCING?'
                value={tattoos_or_body_piercing || 'No'}
              />
              {tattoos_or_body_piercing ? (
                <View>
                  <FormDetail
                    question='Tattoos or Body Piercing details'
                    value={tattoos_or_piercing_details}
                  />
                  <FormDetail
                    question='IF YOU HAVE ANY PIERCINGS, WOULD YOU BE WILLING TO REMOVE THEM FOR THE DURATION OF CAMP?'
                    value={willing_to_remove_piercing}
                  />
                </View>
              ) : null}
            </View>

            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>
                Visa Information
              </Heading>
              <FormDetail
                title='Country of legal Residence'
                value={country_of_legal_residence}
              />
              <FormDetail
                value={number_of_j1_visas || '0'}
                question='HOW MANY J-1 CAMP COUNSELOR VISAS HAVE YOU HAD?'
              />
              {j1_summer_work_visas ? (
                <FormDetail
                  value={j1_summer_work_visas}
                  description='HOW MAN J-1 SUMMER WORK AND TRAVEL VISAS
              (INCLUDES CAMP SUPPORT STAFF) HAVE YOU HAD?'
                />
              ) : null}
              {number_of_j1_visas > 0 || j1_summer_work_visas > 0 ? (
                <View>
                  <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                    Previous Visa Details
                  </Heading>
                  <View>{this.renderPreviousVisaDetails(data)}</View>
                </View>
              ) : null}
              <FormDetail
                value={us_visa_denial || 'No'}
                question='HAVE YOU EVER HAD A UNITED STATES VISA DENIAL?'
              />
              {us_visa_denial ? (
                <FormDetail
                  value={visa_denial_detail}
                  descriptionMin
                  description='Visa denial information, i.e. dates of denial, reasons for denial any mitigating circumstances etc.'
                />
              ) : null}
            </View>
            {additional_documents != false ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Additional Documents
                </Heading>

                {this.renderData(additional_documents)}
              </View>
            ) : null}
            {application_type !== RETURN_TO_CAMP ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>Payments</Heading>
                <MiddleButton
                  text='SEE ALL TRANSACTIONS'
                  onPress={() =>
                    navigate(PAYMENT_TRANSACTIONS, { toDashboard: true })
                  }
                />
              </View>
            ) : null}
            <View>
              <TouchableOpacity
                onPress={() => navigate(TERMS_AND_CONDITIONS_NAV)}
              >
                <SubHeading extraStyling={{ color: '#0000ee' }}>
                  Terms And Conditions
                </SubHeading>
              </TouchableOpacity>
            </View>

            <View style={bottomLine} />
          </View>
        </ScrollView>
        <View style={buttonContainer} key='bottomLeft'>
          <BottomButtonLeft onPress={() => navigate(APPLICATION_STATUS)}>
            Back
          </BottomButtonLeft>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ fetchedUserProfile }) => {
  console.log(fetchedUserProfile);
  return {
    fetchedUserProfile
  };
};

export default connect(mapStateToProps)(StageOneForm);
