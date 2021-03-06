var generators = require('yeoman-generator');

var v_smj = "src/main/java/",
    v_smr = "src/main/resources/",
    v_oct = "io/github/todo/",
    v_c = v_smj + v_oct,
    v_r = v_smr + "assets/todo/";

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('modname', { type: String, required: false, optional: true });
    },
    prompting: function () {
        var done = this.async();
        var prompts = [{
            name    : 'modname',
            message : 'Mod name',
            default : this.modname
        }, {
            name    : 'modid',
            message : 'Mod id',
            default : function(props) {
                return props.modname.replace(/\s/g, '').toLowerCase();
            },
            validate: function(input) {
                return !/\s/g.test(input) && /^[a-z]+$/.test(input);
            }
        }, {
            name    : 'description',
            message : 'Mod description'
        }, {
            name    : 'author',
            message : 'Your developer name',
            store   : true
        }, {
            name    : 'credits',
            message : 'Credits',
            default : function(props) {
                return props.author;
            }
        }, {
            name    : 'group',
            message : 'The Java package name',
            default : function(props) {
                return "io.github." + props.modid;
            },
            validate: function(input) {
                return !/\s/g.test(input) && /^[a-z\.]+$/.test(input);
            }
        }, {
            name    : 'baseClass',
            message : 'The mod\'s classname',
            default : function(props) {
                return props.modname.replace(/\s/g, '');
            },
            validate: function(input) {
                return !/\s/g.test(input) && !/\./.test(input);
            }
        }, {
            name    : 'archivesBaseName',
            message : 'The Jar base name',
            default : function(props) {
                return props.modname.replace(/\s/g, '');
            },
            validate: function(input) {
                return !/\s/g.test(input);
            }
        }, {
            name    : 'target',
            message : 'The target directory name for this mod',
            default : function(props) {
                return props.modname.replace(/\s/g, '');
            }
        }];
        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },
    copy: function () {
        var vcr = v_smj + this.props.group.replace(/\./g, '/') + "/";
        var files = [
            v_smr + 'mcmod.info',
            v_smr + 'pack.mcmeta',
            { src: v_r + ".gitkeep", dest: v_smr + "assets/" + this.props.modid + "/.gitkeep" },
            { src: v_c + "Todo.java", dest: vcr + this.props.baseClass + ".java" },
            { src: v_c + "Reference.java", dest: vcr + "Reference.java" },
            { src: v_c + "proxy/ClientProxy.java", dest: vcr + "proxy/ClientProxy.java" },
            { src: v_c + "proxy/CommonProxy.java", dest: vcr + "proxy/CommonProxy.java" },
			{ src: v_c + "proxy/IProxy.java", dest: vcr + "proxy/IProxy.java" },
            ".gitignore",
            "gradle/wrapper",
            "gradle/dev.gradle",
            "gradle/forge.gradle",
            "build.gradle",
            "build.properties",
            "gradle.properties_template",
            "gradlew",
            "gradlew.bat",
            "LICENSE.txt",
            "README.md",
            ".gitignore"
        ];
        var self = this;
        files.forEach(function(file) {
            var s = typeof file == "string" ? file : file.src,
                d = typeof file == "string" ? file : file.dest;
            self.fs.copyTpl(
              self.templatePath(s),
              self.destinationPath(self.props.target + "/" + d),
              self.props
            )
        });
    }
});
