
class MongoUtils {

  buildOpts(query = {}, opts = {}) {
    const { excludeFields, fieldsDefault = {} } = opts;
    const {
      fields = null,
      limit = 10,
      page = 1,
    } = query;
    let validFields = fields;
    if (validFields) {
      validFields = replace(validFields, new RegExp(' ', 'g'), '');
      validFields = split(validFields, ',');
      if (excludeFields) {
        validFields = filter(validFields, field => !includes(excludeFields, field));
      }
      validFields = reduce(validFields, (result, field) => {
        result[field] = 1;
        return result;
      }, {});
    } else {
      validFields = fieldsDefault;
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    return { fields: validFields, limit: parseInt(limit, 10), skip, sort: { createdAt: -1 } };
  }

}

const util = new MongoUtils();

module.exports = util;