window.onload = async function() {
  const {init} = await import('onfido-sdk-ui')

  var url = location.protocol+"//"+location.hostname+":8090/jwt"

  var request = new XMLHttpRequest()
  request.open('GET', url, true)

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)
      window.onfidoOut = init({
        useModal: false,
        token: data.token,
        containerId: 'onfido-mount',
        onComplete: function(data) {
          // callback for when everything is complete
          console.log("Everything is complete", data);
          console.log(JSON.stringify(data));
        },
        steps: [
          {
            type:'welcome',
            options:{
              title:'Radix KYC',
              descriptions: [
                'Please click on the button below to start verifying your identity.',
                'This should only take a few minutes.'
              ]
            }
          },
          {
            type:'document',
            options: {
              documentTypes: {
                passport: true,
                driving_licence: true,
                national_identity_card: true
              }
            }
          },
          {
            type:'face',
            options: {
              requestedVariant: 'video',
              uploadFallback: false
            }
          },
          // {
          //   type: 'poa',
          //   options: {
          //     country: 'gbr',
          //     documentTypes: {
          //       bank_building_society_statement: true,
          //       utility_bill: true,
          //       council_tax: true, // GBR only
          //       benefit_letters: true, // GBR only
          //       government_letter: true // non-GBR only
          //     }
          //   }
          // },
          {
            type: 'complete',
            message: 'Thank you. We\'ll take it from here.',
            submessage: 'This shouldn\'t take long, we\'ll be touch shortly.'
          }
        ]
      });
    }
  }
  request.send()
};


require("./style.css")
