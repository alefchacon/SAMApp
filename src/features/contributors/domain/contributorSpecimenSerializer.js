class ContributorSpecimenSerializer {
  constructor(
    data,
  ){
    this.contributor = data.contributor_id;
    this.contributor_role = data.contributor_role_id;
    this.specimen = data.specimen_id;
  }

}

export default ContributorSpecimenSerializer;