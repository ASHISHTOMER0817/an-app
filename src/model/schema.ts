
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
      email: {
            type: String,
            unique: true,
            required: true
      },
      otp: {
            type: String,
            required: true
      },

})

const CoinSchema = new mongoose.Schema({
      input: {
            type: String,
            primary: true,
      },
      coinValue: {
            type: Number,
            required: true

      }
})

const UserInfoSchema = new mongoose.Schema({

      totalCoin: {
            type: Number,
            default: 0
      },
      email: {
            type: String,
            unique: true,
            required: true,
            primary: true

      }, name: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            },


      }, mobile: {
            value: {
                  type: Number,
                  default: 0
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }


      }, github: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
            }

      }, linkedin: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, propic: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, resume: {
            value: {
                  type: String,
                  default: null
            },
            mimetype: {
                  type: String,
                  default: null
            },
            size: {
                  type: Number,
                  default: 0
            },
            path: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, schoolName: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, startDate: {
            value: {
                  type: Date
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, endDate: {
            value: {
                  type: Date
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, projectName: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, projectLink: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }
      , companyName: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, companyLink: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, role: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, jobStartDate: {
            value: {
                  type: Date,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, jobEndDate: {
            value: {
                  type: Date
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }, coverLetter: {
            value: {
                  type: String,
                  default: null
            },
            coinsCredited: {
                  type: Boolean,
                  default: false
            }

      }
})

const hirerSchema = new mongoose.Schema({

      email: {
            type: String,
            primary: true,
      },
      company: {
            type: String
      },
      location: {
            type: String
      },
      title: {
            type: String
      },
      salaryRange: {
            type: String
      },
      id: {
            type: String
      },
      image: {
            type: String
      },
})

const User = mongoose.models.users || mongoose.model('users', UserSchema)
const UserInfo = mongoose.models.userinfos || mongoose.model('userinfos', UserInfoSchema)
const HirerInfo = mongoose.models.hirerinfos || mongoose.model('hirerinfos', hirerSchema)
const CoinDivision = mongoose.models.coindivisions || mongoose.model('coindivisions', CoinSchema)


export { User, UserInfo, HirerInfo, CoinDivision };