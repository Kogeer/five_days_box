import mongoose from "mongoose";

interface FileAttributes {
    name: string;
    path: string;
    userId: string;
    uploadDate: Date;
}

interface FileDoc extends mongoose.Document {
    name: string;
    path: string;
    userId: string;
    uploadDate: Date;
}

interface IFileModel extends mongoose.Model<FileDoc> {
    build(attributes: FileAttributes): FileDoc;
}

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    uploadDate: {
        type: mongoose.Schema.Types.Date,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

fileSchema.statics.build = (attributes: FileAttributes) => {
    return new FileModel(attributes);
};

const FileModel = mongoose.model<FileDoc, IFileModel>('FileModel', fileSchema);

export { FileModel };
