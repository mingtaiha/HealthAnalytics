System Breakdown:
[Website] ------
                | ---- [Processor] --- [Datastore] --- (Database)
[Mobile App] ---                            |
                                          (JSON)
                                            |
                                      [Health Model]


Our system is broken down into 5 parts (represented by the '[]' above). Each of the parts are modules on their own with unique responsibilities and should be run separately. 

This folder contains all of the modules and each module contains its own readme file with instructions on how to install and run. This file is in either text or markdown format (see: https://help.github.com/articles/github-flavored-markdown/). 

To deploy out system you should do it in the following order:
1) Health Model
2) Datastore + Processor (together)
3) Mobile Application
4) Website

*Note: * The Mobile application's name is 'card.io' so all files needed for it are under the folder with the same name.
